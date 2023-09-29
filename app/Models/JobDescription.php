<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JobDescription extends Model
{
    use HasFactory;

    protected $fillable = [
        'job_order_id',
        'description',
        'amount',
    ];

    public function jobOrder() {
        return $this->belongsTo(JobOrder::class);
    }
    
}
