<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use App\Mail\NotificationEmail;
use App\Models\Dogadjaj;

use DateTime;

use Spatie\IcalendarGenerator\Components\Calendar;
use Spatie\IcalendarGenerator\Components\Event;

class EmailController extends Controller
{
    public function sendNotificationEmail(Request $request)
    {
        // Provera autentifikacije
        if (!Auth::check()) {
            return response()->json(['error' => 'Korisnik nije prijavljen'], 401);
        }
        
        $eventId = $request->input('eventId');
        $user = Auth::user();
        
        // Pronalaženje događaja
        $event = Dogadjaj::find($eventId);
        if (!$event) {
            return response()->json(['error' => 'Dogadjaj nije pronadjen'], 404);
        }
        
        
        // Kreiranje kalendara
        $calendar = Calendar::create($event->naziv);
        
        // Dodavanje u kalendar
        $ev = Event::create()
            ->name($event->naziv)
            ->description($event->opis)
            ->startsAt(DateTime::createFromFormat('Y-m-d H:i:s', $event->datum));
        $calendar->event($ev);
    
    // Slanje emaila
    try {
        $mail = new NotificationEmail("Podsetnik za događaj: ".$event->naziv, "Opis događaja: ".$event->opis);
        $mail->attachData($calendar->get(), "event.ics");
        Mail::to($user->email)->send($mail);
        return response()->json(['message' => 'Email notifikacija je uspešno poslata'], 200);
    } catch (\Exception $e) {
        return response()->json(['error' => 'Došlo je do greške prilikom slanja email notifikacije: $e'], 500);
    }
}
}
