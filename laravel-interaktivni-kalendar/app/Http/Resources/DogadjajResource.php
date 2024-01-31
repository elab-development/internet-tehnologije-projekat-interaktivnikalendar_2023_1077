<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DogadjajResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'Id: ' => $this->resource->id,
            'naziv: ' => $this->resource->naziv,
            'opis: ' => $this->resource->opis,
            'datum_pocetka: ' => $this->resource->datum_pocetka,
            'datum_zavrsetka: ' => $this->resource->datum_zavrsetka,
            'lokacija_id: ' => new LokacijaResource($this->resource->lokacija),
            'user_id: ' => new UserResource($this->resource->user),
        ];
    }
}
