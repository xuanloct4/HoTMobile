package com.hotmobile;

import android.app.*;
import android.content.Context;
import android.content.Intent;
import android.graphics.BitmapFactory;
import android.graphics.Color;
import android.media.RingtoneManager;
import android.net.Uri;
import android.util.Log;
import androidx.core.app.NotificationCompat;
import com.google.firebase.messaging.FirebaseMessagingService;
import com.google.firebase.messaging.RemoteMessage;
import com.hotmobile.R;
import io.invertase.firebase.messaging.RNFirebaseMessagingService;

import java.util.ArrayList;
import java.util.List;

public class MyPushService extends FirebaseMessagingService {

    private List<FirebaseMessagingService> messagingServices = new ArrayList<>();

    public MyPushService() {
        messagingServices.add(new RNFirebaseMessagingService());
    }

//    private void delegate(Action<FirebaseMessagingService> action) {
//        for (FirebaseMessagingService service : messagingServices) {
//            action.run(service);
//        }
//    }
//
//    private void injectContext(FirebaseMessagingService service) {
//        setField(service, "mBase", this); // util method for recursive field search
//    }

    @Override
    public void onNewToken(String s) {
//        messagingServices.get(0).onNewToken(s);

//        delegate(service -> {
//            injectContext(service);
//            service.onNewToken(s);
//        });
    }

    @Override
    public void onMessageReceived(RemoteMessage remoteMessage) {
//        messagingServices.get(0).onMessageReceived(remoteMessage);

//        delegate(service -> {
//            injectContext(service);
//            service.onMessageReceived(remoteMessage);
//        });

        MyPushService.processNotification(remoteMessage);
    }


    public static void processNotification(RemoteMessage remoteMessage) {
        Intent myIntent = new Intent(MainApplication.getContext(), DialingActitvity.class);
        myIntent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK
                | Intent.FLAG_ACTIVITY_CLEAR_TASK);
        myIntent.setAction("com.hotmobile.CUSTOM_INTENT");
// Create the TaskStackBuilder and add the intent, which inflates the back stack
        TaskStackBuilder stackBuilder = TaskStackBuilder.create(MainApplication.getContext());
        stackBuilder.addNextIntentWithParentStack(myIntent);
        // Get the PendingIntent containing the entire back stack
        PendingIntent notifyPendingIntent =
                stackBuilder.getPendingIntent(0, PendingIntent.FLAG_UPDATE_CURRENT);
//        // Create the PendingIntent
//        PendingIntent notifyPendingIntent = PendingIntent.getActivity(
//                (Application)reactContext.getApplicationContext(), 0, myIntent, PendingIntent.FLAG_UPDATE_CURRENT
//        );

        MainApplication.getContext().startActivity(myIntent);
//        ((Application)reactContext.getApplicationContext()).startActivity(notifyPendingIntent);
        MainApplication.getContext().sendBroadcast(myIntent);


        Uri defaultSoundUri = RingtoneManager.getDefaultUri(RingtoneManager.TYPE_NOTIFICATION);
        NotificationManager mNotifyManager = (NotificationManager) MainApplication.getContext().getSystemService((Context.NOTIFICATION_SERVICE));
//For Android Version Orio and greater than orio.)
        if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.O) {
            int importance = NotificationManager.IMPORTANCE_LOW;
            NotificationChannel mChannel = new NotificationChannel("Sesame", "Sesame", importance);
            mChannel.setDescription("notifyPendingIntent");
            mChannel.enableLights(true);
            mChannel.setLightColor(Color.RED);
            mChannel.enableVibration(true);
            mChannel.setVibrationPattern(new long[]{100, 200, 300, 400, 500, 400, 300, 200, 400});

            mNotifyManager.createNotificationChannel(mChannel);
        } else {
//For Android Version lower than oreo.
            NotificationCompat.Builder mBuilder = new NotificationCompat.Builder(MainApplication.getContext(), "Seasame");
            mBuilder.setContentTitle("dsff")
                    .setContentText("dsfsdfds")
                    .setSmallIcon(R.mipmap.ic_launcher)
                    .setLargeIcon(BitmapFactory.decodeResource(MainApplication.getContext().getResources(), R.mipmap.ic_launcher))
                    .setAutoCancel(true)
                    .setSound(defaultSoundUri)
                    .setColor(Color.parseColor("#FFD600"))
                    .setContentIntent(notifyPendingIntent)
                    .setChannelId("Sesame")
                    .setPriority(NotificationCompat.PRIORITY_LOW);

            String CHANNEL_ID = "android";
            int NOTIFICATION_ID = 1;
//        NotificationCompat.Builder builder = new NotificationCompat.Builder((Application)reactContext.getApplicationContext(), CHANNEL_ID);
//        builder.setContentIntent(notifyPendingIntent);
//
//        NotificationManagerCompat mNotifyManager = NotificationManagerCompat.from((Application)reactContext.getApplicationContext());
            mNotifyManager.notify(NOTIFICATION_ID, mBuilder.build());
        }
    }
}
