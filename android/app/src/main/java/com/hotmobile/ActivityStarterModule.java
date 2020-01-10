package com.hotmobile;

import android.app.*;
import android.content.Context;
import android.content.Intent;
import android.graphics.BitmapFactory;
import android.graphics.Color;
import android.media.RingtoneManager;
import android.net.Uri;
import androidx.core.app.NotificationCompat;
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
import com.facebook.react.bridge.Callback;
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
        MyPushService.processNotification(null);
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








    //
    @ReactMethod
    void getRandomUUID(Callback callback) {
        callback.invoke(Utils.getRandomUUID());
    }

    @ReactMethod
    void getSaltString(Callback callback) {  callback.invoke(Utils.getSaltString()); }

    @ReactMethod
    void getRamdomNumber(int max, Callback callback) {
        callback.invoke(Utils.getRamdomNumber(max));
    }

    @ReactMethod
    void setLanguage(Context context, String language) { Utils.setLanguage(MainApplication.getInstance(), language); }

    @ReactMethod
    void encryptRSA(String plaintext, String pub_key, Callback callback) {
        String en = Utils.encryptRSA(plaintext, pub_key);
        callback.invoke(en);
    }

    @ReactMethod
    void decryptRSA(String plaintext, String pub_key, Callback callback) { callback.invoke(Utils.decryptRSA(plaintext, pub_key)); }

    @ReactMethod
    void getDeviceName(Callback callback) {
        callback.invoke(Utils.getDeviceName());
    }

    @ReactMethod
    void getSerialNumber(Callback callback) { callback.invoke(Utils.getSerialNumber()); }

    @ReactMethod
    void getFirmwareVersion(Callback callback) {
        callback.invoke(Utils.getFirmwareVersion());
    }

    @ReactMethod
    void getDeviceId(Callback callback) {
        callback.invoke(Utils.getDeviceId());
    }

    @ReactMethod
    void getDeviceDes(Callback callback) {
        callback.invoke(Utils.getDeviceDes());
    }

    @ReactMethod
    void getScreenWidth(Callback callback) { callback.invoke(Utils.getScreenWidth()); }

    @ReactMethod
    void getScreenHeight(Callback callback) { callback.invoke(Utils.getScreenHeight()); }

    @ReactMethod
    void getOSVersion(Callback callback) {
        callback.invoke(android.os.Build.VERSION.SDK_INT);
    }

    @ReactMethod
    void getOSName(Callback callback) {
        callback.invoke("Android");
    }
//    @ReactMethod
//    void getUniqueIMEIId(Callback callback) {
//        callback.invoke(getNetworkInfo(1));
//    }

    @ReactMethod
    void getMACAddress(String interfaceName, Callback callback) { callback.invoke(Utils.getMACAddress(interfaceName)); }

    @ReactMethod
    void getIPv6Address(Callback callback) { callback.invoke(Utils.getIPAddress(false)); }

    @ReactMethod
    void getIPAddress(Callback callback) { callback.invoke(Utils.getIPAddress(true)); }

    @ReactMethod
    void getCurrentTime(Callback callback) { callback.invoke(Utils.getCurrentTime()); }
}
