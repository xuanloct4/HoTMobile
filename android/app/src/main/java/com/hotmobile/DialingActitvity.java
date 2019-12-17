package com.hotmobile;

import android.annotation.TargetApi;
import android.app.Activity;
import android.content.BroadcastReceiver;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.media.AudioManager;
import android.media.MediaPlayer;
import android.media.Ringtone;
import android.media.RingtoneManager;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.view.View;
import android.view.WindowManager;
import androidx.annotation.CallSuper;
import com.hotmobile.R;

import javax.annotation.Nullable;
import java.io.File;

/**
 * Activity to start from React Native JavaScript, triggered via
 * {@link ActivityStarterModule#navigateToExample()}.
 */
public class DialingActitvity extends Activity {
    MediaPlayer mp;
    Ringtone ringtoneSound;

    @Override
    @CallSuper
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.my_activity);

        getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON |
                WindowManager.LayoutParams.FLAG_DISMISS_KEYGUARD |
                WindowManager.LayoutParams.FLAG_SHOW_WHEN_LOCKED |
                WindowManager.LayoutParams.FLAG_TURN_SCREEN_ON);
        findViewById(R.id.trigger_alert_button).setEnabled(true);
        findViewById(R.id.go_back_button).setOnClickListener(new View.OnClickListener() {
            @TargetApi(Build.VERSION_CODES.ECLAIR)
            @Override
            public void onClick(View view) {
                stopAudio();
                onBackPressed();
            }
        });
        findViewById(R.id.trigger_alert_button).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                stopAudio();
                openTheApp();
            }
        });


        mp = new MediaPlayer();
        setVolumeControlStream(AudioManager.STREAM_MUSIC);
        playAudio();

    }

    void openTheApp() {
//        ActivityStarterModule.triggerAlert("Hello from " + DialingActitvity.class.getSimpleName());

        final String appPackageName = getApplicationContext().getPackageName();
        Intent intent = getPackageManager().getLaunchIntentForPackage(appPackageName);
        startActivity(intent);
    }

    void stopAudio() {
        if (ringtoneSound != null) {
            ringtoneSound.stop();
        }
    }

    void playAudio() {
        //        AudioManager audioManager = (AudioManager) MainApplication.getContext().getSystemService(Context.AUDIO_SERVICE);
//        mp = MediaPlayer.create(MainApplication.getContext(), RingtoneManager.getDefaultUri(RingtoneManager.TYPE_NOTIFICATION));
//
//        try {
//            float leftVol = (float) (audioManager.getStreamVolume(AudioManager.STREAM_NOTIFICATION) / 7.0);
//            float rightVol = (float) (audioManager.getStreamVolume(AudioManager.STREAM_NOTIFICATION) / 7.0);
//            mp.setVolume(leftVol, rightVol);
//        } catch (Exception e) {
//            e.printStackTrace();
//        }


//        try {
////            mp.setDataSource(MainApplication.getContext(), Uri.parse("android.resource://urpackagename/res/raw/urmp3name");
////            // If you have to use from SD card
////            File path = android.os.Environment.getExternalStorageDirectory();
////            mp.setDataSource(path + "urmp3filename");
//
//            Uri notification = RingtoneManager.getDefaultUri(RingtoneManager.TYPE_NOTIFICATION);
//
//            mp = MediaPlayer.create(getApplicationContext(), R.raw.song);
////            mp.setDataSource(MainApplication.getContext(), Uri.parse("android.resource://com.hotmobile/res/raw/song"));
////           mp = MediaPlayer.create(getApplicationContext(), notification);
////            mp.prepare();
//            mp.start();
//        } catch (Exception e) {
//            e.printStackTrace();
//        }

        Uri ringtoneUri = RingtoneManager.getDefaultUri(RingtoneManager.TYPE_ALARM);
        ringtoneSound = RingtoneManager.getRingtone(getApplicationContext(), ringtoneUri);

        if (ringtoneSound != null) {
            ringtoneSound.play();
        }
    }

    @Override
    public void onResume() {
        super.onResume();
    }

    @Override
    protected void onDestroy() {
        mp.release();
        super.onDestroy();
    }
}
