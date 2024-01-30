<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\DogadjajResource;
use App\Models\Dogadjaj;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class DogadjajController extends Controller
{
    public function index()
    {
        if(Auth::user()->isAdmin){
            return response()->json(['error' => 'Admin ne moze prikazati sve dogadjaje!'], 403);
        }
        $dogadjaji = Dogadjaj::all();
        return DogadjajResource::collection($dogadjaji);
    }

    public function show($id)
    {
        if(Auth::user()->isAdmin){
            return response()->json(['error' => 'Admin ne moze prikazati dogadjaj na osnovu ID-ija!'], 403);
        }
        $dogadjaj = Dogadjaj::findOrFail($id);
        return new DogadjajResource($dogadjaj);
    }

    public function store(Request $request)
    {
    $user_id = Auth::user()->id;
    $validator = Validator::make($request->all(), [
        'naziv' => 'required',
        'opis' => 'required',
        'datum_pocetka' => 'required',
        'datum_zavrsetka' => 'required',
        'lokacija_id' => 'required',
    ]);

    if ($validator->fails()) {
        $errors = $validator->errors();
        return response()->json($errors);
    }

    if(Auth::user()->isAdmin){
        return response()->json(['error' => 'Admin ne moze kreirati dogadjaje!'], 403);
    }

    $dogadjaj = new Dogadjaj();
    $dogadjaj->naziv = $request->naziv;
    $dogadjaj->opis = $request->opis;
    $dogadjaj->datum_pocetka = $request->datum_pocetka;
    $dogadjaj->datum_zavrsetka = $request->datum_zavrsetka;
    $dogadjaj->lokacija_id = $request->lokacija_id;
    $dogadjaj->user_id = $user_id;


    $dogadjaj->save();

    return response()->json(['Uspešno kreiran novi dogadjaj!',
         new DogadjajResource($dogadjaj)]);
    }


    public function update(Request $request, $id)
{
    $user_id = Auth::user()->id;
    $validator = Validator::make($request->all(), [
        'naziv' => 'required',
        'opis' => 'required',
        'datum_pocetka' => 'required',
        'datum_zavrsetka' => 'required',
        'lokacija_id' => 'required',
    ]);

    if ($validator->fails()) {
        $errors = $validator->errors();
        return response()->json($errors);
    }

    if(Auth::user()->isAdmin){
        return response()->json(['error' => 'Admin ne moze menjati dogadjaje!'], 403);
    }

    $dogadjaj_user_id = Dogadjaj::where('id', $id)->value('user_id');

    if($user_id != $dogadjaj_user_id){
        return response()->json(['error' => 'Vi niste korisnik koji je kreirao ovaj dogadjaj!'], 403);
    }

    $dogadjaj = Dogadjaj::findOrFail($id);

    $dogadjaj->naziv = $request->naziv;
    $dogadjaj->opis = $request->opis;
    $dogadjaj->datum_pocetka = $request->datum_pocetka;
    $dogadjaj->datum_zavrsetka = $request->datum_zavrsetka;
    $dogadjaj->lokacija_id = $request->lokacija_id;

    $dogadjaj->save();

    return response()->json(['Uspešno ažuriran dogadjaj!', new DogadjajResource($dogadjaj)]);
}


    public function updateOpis(Request $request, $id)
    {
        $user_id = Auth::user()->id;
        $request->validate([
            'opis' => 'required'
        ]);

        if(Auth::user()->isAdmin){
            return response()->json(['error' => 'Admin ne moze menjati dogadjaje!'], 403);
        }

        $dogadjaj_user_id = Dogadjaj::where('id', $id)->value('user_id');

    if($user_id != $dogadjaj_user_id){
        return response()->json(['error' => 'Vi niste korisnik koji je kreirao ovaj dogadjaj!'], 403);
    }


        $dogadjaj = Dogadjaj::findOrFail($id);
    
        $dogadjaj->update(['opis' => $request->input('opis')]);
    
        return response()->json(['message' => 'Opis datog dogadjaja je uspesno izmenjen!', new DogadjajResource($dogadjaj)]);
    }


    public function destroy($id)
    {
        $user_id = Auth::user()->id;
        $dogadjaj_user_id = Dogadjaj::where('id', $id)->value('user_id');

        if(Auth::user()->isAdmin){
            return response()->json(['error' => 'Admin ne moze menjati dogadjaje!'], 403);
        }

    if($user_id != $dogadjaj_user_id){
        return response()->json(['error' => 'Vi niste korisnik koji je kreirao ovaj dogadjaj!'], 403);
    }

        $dogadjaj = Dogadjaj::findOrFail($id);
        $dogadjaj->delete();
        return response()->json('Uspešno obrisan dogadjaj!');
    }
}
