<?php

/*
 * Centreon
 *
 * Source Copyright 2005-2019 Centreon
 *
 * Unauthorized reproduction, copy and distribution
 * are not allowed.
 *
 * For more information : contact@centreon.com
 *
 */
declare(strict_types=1);

namespace CentreonDummy\Domain\Interfaces;

use CentreonDummy\Domain\Dummy;

interface DummyRepositoryInterface
{
    /**
     * Find all dummies.
     *
     * @return Dummy[]
     */
    public function findDummies(): array;
}
