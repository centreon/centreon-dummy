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

namespace CentreonDummy\Domain;

use CentreonDummy\Domain\Interfaces\DummyServiceInterface;
use CentreonDummy\Domain\Interfaces\DummyRepositoryInterface;

class DummyService implements DummyServiceInterface
{
    /**
     * @var DummyRepositoryInterface
     */
    private $dummyRepository;

    /**
     * DummyService constructor.
     * @param DummyRepositoryInterface $dummyRepository
     */
    public function __construct(DummyRepositoryInterface $dummyRepository)
    {
        $this->dummyRepository = $dummyRepository;
    }

    /**
     * @inheritDoc
     */
    public function findDummies(): array
    {
        return $this->dummyRepository->findDummies();
    }
}