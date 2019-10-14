package com.hotmobile;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.widget.Toast;

/**
 * Created by TutorialsPoint7 on 8/23/2016.
 */
public class MyReceiver extends BroadcastReceiver{
    @Override
    public void onReceive(Context context, Intent intent) {
//        Toast.makeText(context, "Intent Detected.", Toast.LENGTH_LONG).show();
     if ("android.intent.action.BOOT_COMPLETED".equals(intent.getAction())) {
        Intent serviceIntent = new Intent("com.hotmobile.MyService");
        context.startService(serviceIntent);
    }
}
}
