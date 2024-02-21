<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Opportunity extends Model
{
    use HasFactory;
// protected $table =  'opportunities';
 protected $fillable = [
     'title',
     'description',
     'estimatevalue',
     'currency',
     'estimateclosuredate',
     'accountowner',
     'clientid',
     'contactperson',
     'phone',
     'email',
     'stage',
     'status'
 ];

}
