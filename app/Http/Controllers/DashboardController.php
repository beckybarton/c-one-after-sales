<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\JobOrder;
use App\Models\JobDescription;
use App\Models\User;
use App\Models\JobOrderMaterial;


class DashboardController extends Controller
{
    public function index(){
        $jobOrders = JobOrder::with([
            'jobDescriptions', 
            'user', 
            'job_order_materials' => function ($filterdeleted) {
                $filterdeleted->where('deleted', 0);
            }, 
            'quotation'
        ])->orderBy('created_at', 'desc')
          ->paginate(10);
        return view('dashboard.index', compact('jobOrders'));
    }
}
