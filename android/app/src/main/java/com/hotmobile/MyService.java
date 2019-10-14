package com.hotmobile;


import android.app.Service;
import android.content.Intent;
import android.os.IBinder;
import android.widget.Toast;
import io.invertase.firebase.messaging.RNFirebaseMessagingService;
//import com.google.firebase.messaging.RemoteMessage;

public class MyService extends Service {
//public class MyService extends RNFirebaseMessagingService {

//    @Override
//    public void onMessageReceived(RemoteMessage message) {
//        super.onMessageReceived(message);
//
////        RNFirebaseMessagingService instance = new RNFirebaseMessagingService();
//
//        Toast.makeText(MainApplication.getContext(), "Intent Detected.", Toast.LENGTH_LONG).show();
//    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        // START YOUR TASKS
        Toast.makeText(MainApplication.getContext(), "Intent Detected.", Toast.LENGTH_LONG).show();
        return super.onStartCommand(intent, flags, startId);
    }

    @Override
    public void onDestroy() {
        // STOP YOUR TASKS
        super.onDestroy();
    }

    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }
}
