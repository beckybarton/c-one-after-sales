<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Quotation extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'job_order_id',
        'user_id',
        'status',
        'vat',
        'discount',
        'approved_date',
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function jobDescription() {
        return $this->belongsT0(JobDescription::class);
    }

    public function approver(){
        return $this->belongsTo(User::class, 'approver_id');
    }
}
