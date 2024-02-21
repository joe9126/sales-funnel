<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Client extends Model
{
    use HasFactory;

    protected $fillable = [
        'clientid',
        'clientname',
        'address',
        'contact',
        'phone',
        'email',
        'email_1',
        'email_2',
        'status'
    ];
}
