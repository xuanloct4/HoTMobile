package com.hotmobile;

import android.app.*;
import android.content.Context;
import android.content.Intent;
import android.graphics.BitmapFactory;
import android.graphics.Color;
import android.media.RingtoneManager;
import android.net.Uri;
import androidx.core.app.NotificationCompat;
import androidx.core.app.NotificationManagerCompat;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.CatalystInstance;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import java.util.HashMap;
import java.util.Map;
import javax.annotation.Nonnull;
import javax.annotation.Nullable;
/**
 * Expose Java to JavaScript. Methods annotated with {@link ReactMethod} are exposed.
 */
class ActivityStarterModule extends ReactContextBaseJavaModule {
    private static DeviceEventManagerModule.RCTDeviceEventEmitter eventEmitter = null;
    ReactApplicationContext reactContext;
    ActivityStarterModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }
    @Override
    public void initialize() {
        super.initialize();
        eventEmitter = getReactApplicationContext().getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class);
    }
    /**
     * @return the name of this module. This will be the name used to {@code require()} this module
     * from JavaScript.
     */
    @Override
    public String getName() {
        return "ActivityStarter";
    }
    @Nullable
    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put("MyEventName", "MyEventValue");
        return constants;
    }
    @ReactMethod
    void navigateToExample() {

        Intent myIntent = new Intent((Application)reactContext.getApplicationContext(), MyActivity.class);
        myIntent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK
                | Intent.FLAG_ACTIVITY_CLEAR_TASK);
        myIntent.setAction("com.hotmobile");
// Create the TaskStackBuilder and add the intent, which inflates the back stack
        TaskStackBuilder stackBuilder = TaskStackBuilder.create((Application)reactContext.getApplicationContext());
        stackBuilder.addNextIntentWithParentStack(myIntent);
        // Get the PendingIntent containing the entire back stack
        PendingIntent notifyPendingIntent =
                stackBuilder.getPendingIntent(0, PendingIntent.FLAG_UPDATE_CURRENT);
//        // Create the PendingIntent
//        PendingIntent notifyPendingIntent = PendingIntent.getActivity(
//                (Application)reactContext.getApplicationContext(), 0, myIntent, PendingIntent.FLAG_UPDATE_CURRENT
//        );

        ((Application)reactContext.getApplicationContext()).startActivity(myIntent);
//        ((Application)reactContext.getApplicationContext()).startActivity(notifyPendingIntent);

        reactContext.getApplicationContext().sendBroadcast(myIntent);


        Uri defaultSoundUri = RingtoneManager.getDefaultUri(RingtoneManager.TYPE_NOTIFICATION);
        NotificationManager mNotifyManager = (NotificationManager) reactContext.getApplicationContext().getSystemService((Context.NOTIFICATION_SERVICE));
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
        }
//For Android Version lower than oreo.
        NotificationCompat.Builder mBuilder = new NotificationCompat.Builder((Application)reactContext.getApplicationContext(), "Seasame");
        mBuilder.setContentTitle("dsff")
                .setContentText("dsfsdfds")
                .setSmallIcon(R.mipmap.ic_launcher)
                .setLargeIcon(BitmapFactory.decodeResource(reactContext.getApplicationContext().getResources(), R.mipmap.ic_launcher))
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
    @ReactMethod
    void dialNumber(@Nonnull String number) {
        Activity activity = getCurrentActivity();
        if (activity != null) {
            Intent intent = new Intent(Intent.ACTION_DIAL, Uri.parse("tel:" + number));
            activity.startActivity(intent);
        }
    }
    @ReactMethod
    void getActivityName(@Nonnull Callback callback) {
        Activity activity = getCurrentActivity();
        if (activity != null) {
            callback.invoke(activity.getClass().getSimpleName());
        } else {
            callback.invoke("No current activity");
        }
    }
    @ReactMethod
    void getActivityNameAsPromise(@Nonnull Promise promise) {
        Activity activity = getCurrentActivity();
        if (activity != null) {
            promise.resolve(activity.getClass().getSimpleName());
        } else {
            promise.reject("NO_ACTIVITY", "No current activity");
        }
    }
    @ReactMethod
    void callJavaScript() {
        Activity activity = getCurrentActivity();
        if (activity != null) {
            MainApplication application = (MainApplication) activity.getApplication();
            ReactNativeHost reactNativeHost = application.getReactNativeHost();
            ReactInstanceManager reactInstanceManager = reactNativeHost.getReactInstanceManager();
            ReactContext reactContext = reactInstanceManager.getCurrentReactContext();
            if (reactContext != null) {
                CatalystInstance catalystInstance = reactContext.getCatalystInstance();
                WritableNativeArray params = new WritableNativeArray();
                params.pushString("Hello, JavaScript!");
                catalystInstance.callFunction("JavaScriptVisibleToJava", "alert", params);
            }
        }
    }
    /**
     * To pass an object instead of a simple string, create a {@link WritableNativeMap} and populate it.
     */
    static void triggerAlert(@Nonnull String message) {
        eventEmitter.emit("MyEventValue", message);
    }
}
