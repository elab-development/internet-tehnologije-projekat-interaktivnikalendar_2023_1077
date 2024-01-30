<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lokacija extends Model
{
    use HasFactory;

    protected $table = 'lokacije';
    
    protected $fillable = [
        'naziv', 
        'adresa', 
        'grad', 
        'drzava', 
        'poštanski_kod'
    ];
}
