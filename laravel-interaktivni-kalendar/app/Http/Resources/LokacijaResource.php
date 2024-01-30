<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LokacijaResource extends JsonResource
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
            'adresa: ' => $this->resource->adresa,
            'grad: ' => $this->resource->grad,
            'drzava: ' => $this->resource->drzava,
            'poštanski_kod: ' => $this->resource->poštanski_kod,
        ];
    }
}
