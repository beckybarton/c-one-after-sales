<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JobOrder extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'customername',
        'unitcode',
        'unitdescription',
        'approver_id',
        'approved_date',
        'customeraddress',
        'customercontact',
        'engine',
        'platenumber',
    ];
    
    public function jobDescriptions() {
        return $this->hasMany(JobDescription::class);
    }

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function job_order_materials()
    {
        return $this->hasMany(JobOrderMaterial::class);
    }

    public function quotation(){
        return $this->hasOne(Quotation::class);
    }

    public function getTotalAmountAttribute(){
        return $this->jobDescriptions->sum('amount');
    }

    public function getTotalAmountMaterialsAttribute(){
        return $this->job_order_materials->sum('amount');
    }
    
    
}
