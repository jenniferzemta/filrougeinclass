<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class CustomResetPassword extends Notification
{
    use Queueable;
    protected $token;


    /**
     * Create a new notification instance.
     */
    public function __construct ($token)
    {
        //
        $this->token = $token;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    // public function toMail(object $notifiable): MailMessage
    // {
    //     return (new MailMessage)
    //         ->line('The introduction to the notification.')
    //         ->action('Notification Action', url('/'))
    //         ->line('Thank you for using our application!');
    // }


    // app/Notifications/CustomResetPassword.php
public function toMail($notifiable)
{
    //  $url = url(config('app.frontend_url').'?token='.$this->token.'&email='.$notifiable->email);
 $url = config('app.frontend_url') . '/reset-password?' . http_build_query([
        'token' => $this->token,
        'email' => $notifiable->email
    ]);
     return (new MailMessage)
       // ->from('laurejennifer@06gmail.com')
        ->subject('Réinitialisation de mot de passe')
        ->line('Vous recevez cet email car nous avons reçu une demande de réinitialisation.')
        ->action('Réinitialiser le mot de passe', $url)
        ->line('Ce lien expirera dans 60 minutes.');
    // ->from('laurejennifer06@gmail.com') // Ajoutez cette ligne
    //     ->subject('Réinitialisation de mot de passe')
    //     ->action('Réinitialiser', $url);
}
    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
