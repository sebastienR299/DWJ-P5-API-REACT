<?php

namespace App\Controller;

use App\Entity\Invoice;

class InvoicesIncrementationController {


    public function __invoke(Invoice $data)
    {
        dd($data);
    }

}