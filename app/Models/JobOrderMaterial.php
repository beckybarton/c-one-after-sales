<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JobOrderMaterial extends Model
{
    use HasFactory;

    protected $fillable = [
        'job_order_id',
        'material',
        'amount',
        'deleted'
    ];

    public function jobOrder(){
        return $this->belongsTo(JobOrder::class);
    }
}
