<?php

/*
 * Copyright 2020 Centreon (http://www.centreon.com/)
 *
 * Centreon is a full-fledged industry-strength solution that meets
 * the needs in IT infrastructure and application monitoring for
 * service performance.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,*
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
declare(strict_types=1);

namespace CentreonDummy\Infrastructure;

use Centreon\Domain\RequestParameters\RequestParameters;
use Centreon\Infrastructure\DatabaseConnection;
use Centreon\Infrastructure\Repository\AbstractRepositoryDRB;
use Centreon\Infrastructure\RequestParameters\SqlRequestParametersTranslator;
use CentreonDummy\Domain\Dummy;
use CentreonDummy\Domain\Interfaces\DummyRepositoryInterface;
use Centreon\Domain\Entity\EntityCreator;

class DummyRepositoryRDB extends AbstractRepositoryDRB implements DummyRepositoryInterface
{
    /**
     * @var SqlRequestParametersTranslator
     */
    private $sqlRequestTranslator;

    public function __construct(DatabaseConnection $db, SqlRequestParametersTranslator $sqlRequestTranslator)
    {
        $this->db = $db;
        $this->sqlRequestTranslator = $sqlRequestTranslator;
        $this->sqlRequestTranslator
            ->getRequestParameters()
            ->setConcordanceStrictMode(RequestParameters::CONCORDANCE_MODE_STRICT);
    }

    /**
     * @inheritDoc
     */
    public function findDummies(): array
    {
        $concordanceArray = [
            'id' => 'dummy.id',
            'name' => 'dummy.name',
            'description' => 'dummy.name',
        ];

        // We only allow certain search parameters
        $this->sqlRequestTranslator->setConcordanceArray($concordanceArray);

        $request =
            'SELECT SQL_CALC_FOUND_ROWS DISTINCT dummy.*
            FROM `:db`.mod_dummy_objects dummy';

        $request = $this->translateDbName($request);

        // get search from query parameters
        $searchRequest = $this->sqlRequestTranslator->translateSearchParameterToSql();
        $request .= !is_null($searchRequest) ? ' WHERE ' . $searchRequest : '';

        // Pagination
        $request .= $this->sqlRequestTranslator->translatePaginationToSql();

        $statement = $this->db->prepare($request);

        foreach ($this->sqlRequestTranslator->getSearchValues() as $key => $data) {
            $type = key($data);
            $value = $data[$type];
            $statement->bindValue($key, $value, $type);
        }
        $statement->execute();

        // Set the total records found
        $record = $this->db->query('SELECT FOUND_ROWS()');
        $totalRecord = (int)$record->fetchColumn();

        $this->sqlRequestTranslator->getRequestParameters()->setTotal($totalRecord);

        $dummies = [];
        while (false !== ($result = $statement->fetch(\PDO::FETCH_ASSOC))) {
            $dummies[] = EntityCreator::createEntityByArray(
                Dummy::class,
                $result
            );
        }

        return $dummies;
    }
}
