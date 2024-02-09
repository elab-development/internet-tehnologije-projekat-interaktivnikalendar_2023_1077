<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Resources\LokacijaResource;
use App\Models\Lokacija;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class LokacijaController extends Controller
{
    public function store(Request $request)
    {
    $validator = Validator::make($request->all(), [
        'naziv' => 'required',
        'adresa' => 'required',
        'grad' => 'required',
        'drzava' => 'required',
        'poštanski_kod' => 'required',
    ]);

    if ($validator->fails()) {
        $errors = $validator->errors();
        return response()->json($errors);
    }

    if(!Auth::user()->isAdmin){
        return response()->json(['error' => 'Samo admin moze kreirati nove lokacije!'], 403);
    }

    $lokacija = new Lokacija();
    $lokacija->naziv = $request->naziv;
    $lokacija->adresa = $request->adresa;
    $lokacija->grad = $request->grad;
    $lokacija->drzava = $request->drzava;
    $lokacija->poštanski_kod = $request->poštanski_kod;


    $lokacija->save();

    return response()->json(['Uspešno kreirana nova lokacija!',
         new LokacijaResource($lokacija)]);
    }


    public function update(Request $request, $id)
{
    $validator = Validator::make($request->all(), [
        'naziv' => 'required',
        'adresa' => 'required',
        'grad' => 'required',
        'drzava' => 'required',
        'poštanski_kod' => 'required',
    ]);

    if ($validator->fails()) {
        $errors = $validator->errors();
        return response()->json($errors);
    }

    if(!Auth::user()->isAdmin){
        return response()->json(['error' => 'Samo admin moze menjati lokacije!'], 403);
    }

    $lokacija = Lokacija::findOrFail($id);

    $lokacija->naziv = $request->naziv;
    $lokacija->adresa = $request->adresa;
    $lokacija->grad = $request->grad;
    $lokacija->drzava = $request->drzava;
    $lokacija->poštanski_kod = $request->poštanski_kod;

    $lokacija->save();

    return response()->json(['Uspešno ažurirana lokacija!', new LokacijaResource($lokacija)]);
}


public function index(Request $request)
    {
        if ($request->has('naziv')) {
            // Dohvati ID lokacije na osnovu naziva
            $naziv = $request->input('naziv');
            $lokacija = Lokacija::where('naziv', $naziv)->first();

            if ($lokacija) {
                return response()->json(['id' => $lokacija->id]);
            } else {
                return response()->json(['error' => 'Lokacija nije pronađena'], 404);
            }
        } else {
            // Dohvati sve lokacije iz baze
            $lokacije = Lokacija::all();
            return response()->json(['lokacije' => LokacijaResource::collection($lokacije)]);
        }
    }

public function destroy($id)
{

if(!Auth::user()->isAdmin){
        return response()->json(['error' => 'Samo admin moze brisati lokacije!'], 403);
    }
    
    $lokacija = Lokacija::findOrFail($id);
    $lokacija->delete();
    return response()->json('Uspešno obrisana lokacija!');
}

}
