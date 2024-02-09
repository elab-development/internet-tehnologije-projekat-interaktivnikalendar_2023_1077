<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Dogadjaj extends Model
{
    use HasFactory;

    protected $table = 'dogadjaji';

    protected $fillable = [
        'naziv', 
        'opis', 
        'datum',  
        'lokacija_id',
        'user_id',
    ];

    public function lokacija()
    {
         return $this->belongsTo(Lokacija::class);
    }

    public function user()
    {
         return $this->belongsTo(User::class);
    }
}
