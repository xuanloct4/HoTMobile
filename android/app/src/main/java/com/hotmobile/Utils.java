package com.hotmobile;

import android.Manifest;
import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.content.res.Configuration;
import android.content.res.Resources;
import android.net.Uri;
import android.os.Build;
import android.provider.Settings;
import android.security.keystore.KeyGenParameterSpec;
import android.security.keystore.KeyProperties;
//import android.support.v4.app.ActivityCompat;
import android.telephony.TelephonyManager;
import android.telephony.gsm.GsmCellLocation;
import android.util.DisplayMetrics;
import android.util.Log;
import android.view.View;
import android.view.inputmethod.InputMethodManager;

import android.widget.TextView;

import java.io.IOException;
import java.lang.reflect.Method;
import java.math.BigInteger;
import java.net.InetAddress;
import java.net.NetworkInterface;
import java.security.*;
import java.security.cert.CertificateException;
import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;
import java.security.spec.PKCS8EncodedKeySpec;
import java.security.spec.RSAPrivateKeySpec;
import java.security.spec.RSAPublicKeySpec;
import java.security.spec.X509EncodedKeySpec;
import java.text.DecimalFormat;
import java.text.Normalizer;
import java.text.NumberFormat;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.regex.Pattern;

import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;

public class Utils {

    public static final String MONEY_FORMAT = "###,###,###,###";
    public static final String ORIGINAL_DATE_FORMAT = "yyyy-MM-dd'T'HH:mm:ss'Z'";
    public static final String NEW_DATE_FORMAT = "dd MMM yyyy HH:mm:ss";
    public static final String ORDER_DETAIL_FORMAT = "dd/MM/yyyy  HH:mm";
    public static final String DATE_MANAGE_DEVICE_FORMAT = "MMM dd,yyyy";
    public static final String DATE_REMOVE_DEVICE_FORMAT = "dd/MM/yyyy";
    private static String ORDER_LIST_FORMAT= "HH:mm  dd/MM/yy";

    /**
     * Get Static factory to retrieve a type 4 (pseudo randomly generated) UUID
     *
     * @return UUID - Type 4
     */
    public static String getRandomId() {
        return UUID.randomUUID().toString();
    }

    public static String getSaltString() {
        Random random = new Random();
        return Long.toHexString(random.nextLong());
    }

    public static void hideKeyboard(Activity activity) {
        View view = activity.getCurrentFocus();
        if (view != null) {
            InputMethodManager imm = (InputMethodManager) activity.getSystemService(Context.INPUT_METHOD_SERVICE);
            imm.hideSoftInputFromWindow(view.getWindowToken(), 0);
        }
    }

    public static String formatMoney(double money) {
        return String.format(Locale.US, "%,.0f", money);
    }

    public static String formatMoney(long money) {
        try {
            DecimalFormat numberFormat = new DecimalFormat(MONEY_FORMAT);
            return numberFormat.format(money).replace(",", ".");
        } catch (Exception e) {
            e.printStackTrace();
            return TextUtils.EMPTY;
        }
    }

    public static int getRamdomNumber(int max) {
        return new Random().nextInt(max);
    }

    public static List<String> getNumberFromResponse(String responseMess) {
        StringBuffer stringBuffer = new StringBuffer();
        List<String> ls = new ArrayList<>();
        for (int i = 0; i < responseMess.length(); i++) {
            char charCheck = responseMess.charAt(i);
            if (Character.isDigit(charCheck)) {
                if (i == responseMess.length() - 1) {
                    stringBuffer.append(charCheck);
                    ls.add(stringBuffer.toString());
                    break;
                }
                stringBuffer.append(charCheck);
            } else {
                if (!stringBuffer.toString().isEmpty()) {
                    ls.add(stringBuffer.toString());
                    stringBuffer = new StringBuffer();
                }
            }
        }
        return ls;
    }

    public static String formatMoney(double money, String language) {
        if (language == null) {
            return "0";
        }
        NumberFormat format = NumberFormat.getInstance();
        return format.format(money);
    }

    public static String formatMoney(double money, String language, String currency) {
        if (language == null || currency == null) {
            return "0";
        }
        NumberFormat format = NumberFormat.getInstance();
        format.setCurrency(Currency.getInstance(currency));
        if ("VND".equalsIgnoreCase(currency)) {
            format.setMaximumFractionDigits(0);
        }

        return format.format(money);
    }

    public static String formatMoneyCurrency(String currencyString) {
        Currency currency = Currency.getInstance(currencyString);
        return currency.getSymbol();
    }

    public static String formatUpdatedDate(Date date, Context context, String dateFormatStr) {
        Locale currentLocale;
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
            currentLocale = context.getResources().getConfiguration().getLocales().get(0);
        } else {
            currentLocale = context.getResources().getConfiguration().locale;
        }
        return new SimpleDateFormat(dateFormatStr, currentLocale).format(date);
    }

    public static String getStringFromResponse(int mess, List<String> listNumber) {
        if (listNumber.size() == 2) {
            return MainApplication.getInstance().getString(mess, Integer.parseInt(listNumber.get(0)), Integer.parseInt(listNumber.get(1)));
        }
        return MainApplication.getInstance().getString(mess, Integer.parseInt(listNumber.get(0)));
    }

    public static Context setLanguage(Context context, String language) {
        Resources res = context.getResources();
        DisplayMetrics dm = res.getDisplayMetrics();
        Configuration conf = res.getConfiguration();
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN_MR1) {
            conf.setLocale(new Locale(language.toLowerCase()));
            context = context.createConfigurationContext(conf);
        } else {
            conf.locale = new Locale(language.toLowerCase());
            res.updateConfiguration(conf, dm);
        }
        return context;
    }

    public static String formatUpdatedDate(Date date, Context context) {
        return formatUpdatedDate(date, context, NEW_DATE_FORMAT);
    }

    public static String formatDateOrderDetail(Date date, Context context) {
        return formatUpdatedDate(date, context, ORDER_DETAIL_FORMAT);
    }

    public static String formatDateOrderList(Date date, Context context) {
        return formatUpdatedDate(date, context, ORDER_LIST_FORMAT);
    }

    public static String formatDateManageDevice(Date date, Context context) {
        return formatUpdatedDate(date, context, DATE_MANAGE_DEVICE_FORMAT);
    }

    public static String formatDateRemoveDevice(Date date, Context context) {
        return formatUpdatedDate(date, context, DATE_REMOVE_DEVICE_FORMAT);
    }

    public static String getVersionName(Context context) {
        String version = "";
        try {
            PackageInfo pInfo = context.getPackageManager().getPackageInfo(context.getPackageName(), 0);
            version = pInfo.versionName;
        } catch (PackageManager.NameNotFoundException e) {
            e.printStackTrace();
        }
        return version;
    }

    public static String getVersionCode(Context context) {
        String versionCode = "";
        try {
            PackageInfo pInfo = context.getPackageManager().getPackageInfo(context.getPackageName(), 0);
            versionCode = String.valueOf(pInfo.versionCode);
        } catch (PackageManager.NameNotFoundException e) {
            e.printStackTrace();
        }
        return versionCode;
    }

    public static int convertDpiToPixel(Context context, int dp) {
        DisplayMetrics displayMetrics = context.getResources().getDisplayMetrics();
        return Math.round(dp * (displayMetrics.xdpi / DisplayMetrics.DENSITY_DEFAULT));
    }

    public static String encryptRSA(String plaintext, String pub_key) {
        String sOut = "";
        try {
            byte[] o_t_pubk = android.util.Base64.decode(pub_key, 0);
            RSAPublicKey rsaKey = (RSAPublicKey) KeyFactory.getInstance("RSA").generatePublic(new X509EncodedKeySpec(o_t_pubk));
            BigInteger modulus = new BigInteger(rsaKey.getModulus().toString());
            BigInteger expoment = new BigInteger(rsaKey.getPublicExponent().toString());
            RSAPublicKeySpec pubKeySpec = new RSAPublicKeySpec(modulus, expoment);
            RSAPublicKey rsaPublicKey = (RSAPublicKey) KeyFactory.getInstance("RSA").generatePublic(pubKeySpec);
            Cipher rsa_cipher = Cipher.getInstance("RSA/ECB/PKCS1Padding");
            rsa_cipher.init(Cipher.ENCRYPT_MODE, rsaPublicKey);
            byte[] enc_data = rsa_cipher.doFinal(plaintext.getBytes());
            sOut = android.util.Base64.encodeToString(enc_data, android.util.Base64.NO_WRAP);
        } catch (Throwable e) {
        }
        return sOut;
    }

    public static String decryptRSA(String plaintext, String pub_key) {
        String sOut = "";
        try {
            byte[] o_t_pubk = android.util.Base64.decode(pub_key, 0);
            KeyFactory keyFactory;
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.P){
                keyFactory = KeyFactory.getInstance("RSA");
            } else {
                keyFactory = KeyFactory.getInstance("RSA", "BC");
            }
            RSAPrivateKey rsaKey = (RSAPrivateKey) keyFactory.generatePrivate(new PKCS8EncodedKeySpec(o_t_pubk));
            BigInteger modulus = new BigInteger(rsaKey.getModulus().toString());
            BigInteger expoment = new BigInteger(rsaKey.getPrivateExponent().toString());
            RSAPrivateKeySpec pubKeySpec = new RSAPrivateKeySpec(modulus, expoment);
            RSAPrivateKey rsaPublicKey = (RSAPrivateKey) KeyFactory.getInstance("RSA").generatePrivate(pubKeySpec);
            Cipher rsa_cipher = Cipher.getInstance("RSA/ECB/PKCS1Padding");
            rsa_cipher.init(Cipher.DECRYPT_MODE, rsaPublicKey);
            byte[] enc_data = rsa_cipher.doFinal(android.util.Base64.decode(plaintext,0));
            sOut = new String(enc_data);
        } catch (Throwable e) {
            e.printStackTrace();
        }
        return sOut;
    }

    private static final String PREF_UNIQUE_ID = "PREF_UNIQUE_ID";


    public static String getDeviceId(Context context) {
        @SuppressLint("HardwareIds")
        String androidId = Settings.Secure.getString(context.getContentResolver(),
                Settings.Secure.ANDROID_ID);
        return androidId;
    }

    public static String getDeviceName() {
        String manufacturer = Build.MANUFACTURER;
        String model = Build.MODEL;
        if (model.toLowerCase().startsWith(manufacturer.toLowerCase())) {
            return capitalize(model);
        } else {
            return capitalize(manufacturer) + " " + model;
        }
    }


    public static String capitalize(String str) {
        if (android.text.TextUtils.isEmpty(str)) {
            return TextUtils.EMPTY;
        }
        char[] chars = str.toLowerCase().toCharArray();
        boolean found = false;
        for (int i = 0; i < chars.length; i++) {
            if (!found && Character.isLetter(chars[i])) {
                chars[i] = Character.toUpperCase(chars[i]);
                found = true;
            } else if (Character.isWhitespace(chars[i])) {
                found = false;
            }
        }
        return String.valueOf(chars);
    }

    public static boolean isContainAccentText(String text, String s) {
        if (!TextUtils.isNullOrEmpty(text)) {
            String StringRemoveAccents = deAccent(text).toLowerCase();
            String removeAccentsSearch = deAccent(s).toLowerCase();
            return text.toLowerCase().contains(removeAccentsSearch) || StringRemoveAccents.contains(removeAccentsSearch);
        }
        return false;
    }

    public static String deAccent(String str) {
        String nfdNormalizedString = Normalizer.normalize(str, Normalizer.Form.NFD);
        Pattern pattern = Pattern.compile("\\p{InCombiningDiacriticalMarks}+");
        return pattern.matcher(nfdNormalizedString).replaceAll("");
    }

    public static String getVersion() {
        return getVersionName(MainApplication.getInstance());
    }

    public static String getSerialNumber() {
        String serialNumber;
        try {
            Class<?> c = Class.forName("android.os.SystemProperties");
            Method get = c.getMethod("get", String.class);

            serialNumber = (String) get.invoke(c, "gsm.sn1");
            if (serialNumber.equals(""))
                serialNumber = (String) get.invoke(c, "ril.serialnumber");
            if (serialNumber.equals(""))
                serialNumber = (String) get.invoke(c, "ro.serialno");
            if (serialNumber.equals(""))
                serialNumber = (String) get.invoke(c, "sys.serialnumber");
            if (serialNumber.equals(""))
                serialNumber = Build.SERIAL;

            // If none of the methods above worked
            if (serialNumber.equals(""))
                serialNumber = null;
        } catch (Exception e) {
            e.printStackTrace();
            serialNumber = null;
        }

        return serialNumber;
    }

    public static String getFirmwareVersion() {
        return String.valueOf(Build.VERSION.SDK_INT);
    }

    @SuppressLint("HardwareIds")
    public static String getDeviceId() {
        return getDeviceId(MainApplication.getInstance());
    }

    public static String getDeviceDes() {
        return getDeviceName();
    }


    public static boolean isSameDay(Date date1, Date date2) {
        if (date1 == null || date2 == null) {
            return false;
        }
        Calendar cal1 = Calendar.getInstance();
        Calendar cal2 = Calendar.getInstance();
        cal1.setTime(date1);
        cal2.setTime(date2);
        return cal1.get(Calendar.DAY_OF_YEAR) == cal2.get(Calendar.DAY_OF_YEAR) &&
                cal1.get(Calendar.YEAR) == cal2.get(Calendar.YEAR);
    }

    public static int getScreenWidth() {
        return Resources.getSystem().getDisplayMetrics().widthPixels;
    }

    public static int getScreenHeight() {
        return Resources.getSystem().getDisplayMetrics().heightPixels;
    }

    public static int getOSVersion() {
        return android.os.Build.VERSION.SDK_INT;
    }

//    @SuppressLint("HardwareIds")
//    public static String getUniqueIMEIId() {
//        return getNetworkInfo(1);
//    }

    /**
     * Returns MAC address of the given interface name.
     *
     * @param interfaceName eth0, wlan0 or NULL=use first interface
     * @return mac address or empty string
     */
    public static String getMACAddress(String interfaceName) {
        try {
            List<NetworkInterface> interfaces = Collections.list(NetworkInterface.getNetworkInterfaces());
            for (NetworkInterface intf : interfaces) {
                if (interfaceName != null) {
                    if (!intf.getName().equalsIgnoreCase(interfaceName)) continue;
                }
                byte[] mac = intf.getHardwareAddress();
                if (mac == null) return "";
                StringBuilder buf = new StringBuilder();
                for (byte aMac : mac) buf.append(String.format("%02X:", aMac));
                if (buf.length() > 0) buf.deleteCharAt(buf.length() - 1);
                return buf.toString();
            }
        } catch (Exception ignored) {
        }
        return "";
    }

    /**
     * Get IP address from first non-localhost interface
     *
     * @param useIPv4 true=return ipv4, false=return ipv6
     * @return address or empty string
     */
    public static String getIPAddress(boolean useIPv4) {
        try {
            List<NetworkInterface> interfaces = Collections.list(NetworkInterface.getNetworkInterfaces());
            for (NetworkInterface intf : interfaces) {
                List<InetAddress> addrs = Collections.list(intf.getInetAddresses());
                for (InetAddress addr : addrs) {
                    if (!addr.isLoopbackAddress()) {
                        String sAddr = addr.getHostAddress();
                        //boolean isIPv4 = InetAddressUtils.isIPv4Address(sAddr);
                        boolean isIPv4 = sAddr.indexOf(':') < 0;

                        if (useIPv4) {
                            if (isIPv4)
                                return sAddr;
                        } else {
                            if (!isIPv4) {
                                int delim = sAddr.indexOf('%'); // drop ip6 zone suffix
                                return delim < 0 ? sAddr.toUpperCase() : sAddr.substring(0, delim).toUpperCase();
                            }
                        }
                    }
                }
            }
        } catch (Exception ignored) {
        } // for now eat exceptions
        return "";
    }

//    public static String getNetworkName() {
//        return getNetworkInfo(2);
//    }
//
//    public static String getNetworkCode() {
//        return getNetworkInfo(3);
//    }
//
//    public static String getNetworkInfo(int infoType) {
//        TelephonyManager telephonyManager = (TelephonyManager) MainApplication.getInstance().getSystemService(Context.TELEPHONY_SERVICE);
//        if (ActivityCompat.checkSelfPermission(MainApplication.getInstance(), Manifest.permission.READ_PHONE_STATE) != PackageManager.PERMISSION_GRANTED) {
//            return "";
//        }
//
//        if (telephonyManager == null) {
//            return "";
//        }
//
//        switch (infoType) {
//            case 1:
//                String imei = telephonyManager.getDeviceId();
//                if (imei != null && !imei.isEmpty()) {
//                    return imei;
//                } else {
//                    return android.os.Build.SERIAL;
//                }
//            case 2:
//                String name = telephonyManager.getNetworkOperatorName();
//                if (name != null && !name.isEmpty()) {
//                    return name;
//                } else {
//                    name = telephonyManager.getNetworkOperator();
//
//                    if (name != null && !name.isEmpty()) {
//                        return name;
//                    }
//                }
//
//                return "";
//            case 3:
//                if (ActivityCompat.checkSelfPermission(MainApplication.getInstance(), Manifest.permission.ACCESS_COARSE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
//                    return "";
//                }
//                String networkOperator = telephonyManager.getSimOperator();
//
//                String mcc = "";
//                String mnc = "";
//
//                if (!networkOperator.isEmpty()) {
//                    mcc = networkOperator.substring(0, 3);
//                    mnc = networkOperator.substring(3);
//                }
//
//                GsmCellLocation cellLocation = (GsmCellLocation) telephonyManager.getCellLocation();
//                int cellid = -1;
//                int celllac = -1;
//
//                if (cellLocation != null) {
//                    cellid = cellLocation.getCid();
//                    celllac = cellLocation.getLac();
//                }
//
//                return String.format("%s:%s:%s:%s", mcc, mnc, cellid == -1 ? "" : String.valueOf(cellid), celllac == -1 ? "" : String.valueOf(celllac));
//        }
//
//        return "";
//    }

    public static String getCurrentTime() {
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat(ORIGINAL_DATE_FORMAT, new Locale("en"));
        simpleDateFormat.setTimeZone(TimeZone.getTimeZone("utc"));

        return simpleDateFormat.format(new Date(System.currentTimeMillis()));
    }

    public static int getResourceId(String pVariableName, String pResourcename, String pPackageName,Context context ) {
        try {
            return context.getResources().getIdentifier(pVariableName, pResourcename, pPackageName);
        } catch (Exception e) {
            e.printStackTrace();
            return -1;
        }
    }

    public static String getLocaleStringResource(Locale requestedLocale, int resourceId, Context context) {
        String result;
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN_MR1) { // use latest api
            Configuration config = new Configuration(context.getResources().getConfiguration());
            config.setLocale(requestedLocale);
            result = context.createConfigurationContext(config).getText(resourceId).toString();
        }
        else { // support older android versions
            Resources resources = context.getResources();
            Configuration conf = resources.getConfiguration();
            Locale savedLocale = conf.locale;
            conf.locale = requestedLocale;
            resources.updateConfiguration(conf, null);

            // retrieve resources from desired locale
            result = resources.getString(resourceId);

            // restore original locale
            conf.locale = savedLocale;
            resources.updateConfiguration(conf, null);
        }

        return result;
    }
}
