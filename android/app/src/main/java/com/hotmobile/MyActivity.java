package com.hotmobile;

import android.app.Activity;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.os.Bundle;
import android.view.View;
import android.view.WindowManager;
import androidx.annotation.CallSuper;

import javax.annotation.Nullable;

/**
 * Activity to start from React Native JavaScript, triggered via
 * {@link ActivityStarterModule#navigateToExample()}.
 */
public class MyActivity extends Activity {
    private BroadcastReceiver broadcastReceiver;

    @Override
    @CallSuper
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.my_activity);
        getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON|
                WindowManager.LayoutParams.FLAG_DISMISS_KEYGUARD|
                WindowManager.LayoutParams.FLAG_SHOW_WHEN_LOCKED|
                WindowManager.LayoutParams.FLAG_TURN_SCREEN_ON);
        findViewById(R.id.trigger_alert_button).setEnabled(true);
        findViewById(R.id.go_back_button).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                onBackPressed();
            }
        });
        findViewById(R.id.trigger_alert_button).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                ActivityStarterModule.triggerAlert("Hello from " + MyActivity.class.getSimpleName());
            }
        });


        broadcastReceiver = new BroadcastReceiver() {
            @Override
            public void onReceive(Context context, Intent intent) {
                // do your stuff related to start activity
            }
        };

        registerReceiver(broadcastReceiver,
                new IntentFilter("com.hotmobile"));
    }
}
