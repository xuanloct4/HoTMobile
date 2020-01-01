package com.hotmobile;


import android.telephony.PhoneNumberUtils;
import android.util.Patterns;

import java.util.Arrays;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class TextUtils {
    public static final String EMPTY = "";
    public static final String MOBILE_NUMBER_PATTERN = "+000-0000-000";
    private static final Pattern VALID_EMAIL_ADDRESS_REGEX =
            Pattern.compile("^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@" +
                    "[A-Za-z0-9][A-Za-z0-9-]*(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$");

    public static boolean isValidPhoneNo(CharSequence iPhoneNo) {
        return !android.text.TextUtils.isEmpty(iPhoneNo) && Patterns.PHONE.matcher(iPhoneNo).matches();
    }

    public static String phoneNumberFormat(String number) {

        int firstDash = MOBILE_NUMBER_PATTERN.indexOf("-");
        int secondDash = MOBILE_NUMBER_PATTERN.indexOf("-", firstDash + 1);

        if (number.startsWith("+")) {
            return "+ " + phoneNumberFormat(number.substring(1, number.length()));
        }
        if (number.length() < 8) {
            return PhoneNumberUtils.formatNumber(number);
        }
        try {
            return number.substring(0, number.length() - secondDash) + "-" + number.substring(number.length() - secondDash, number.length() - firstDash - 1) + "-" + number.substring(number.length() - firstDash - 1, number.length());
        } catch (Exception ex) {
            return PhoneNumberUtils.formatNumber(number);
        }
    }

    public static String phoneNumberMasking(String number) {
        String phoneNumberFormat = phoneNumberFormat(number);
        return phoneNumberFormat.substring(0, 5) + phoneNumberFormat.substring(5, phoneNumberFormat.length() - 3).replaceAll("\\S", "*") + phoneNumberFormat.substring(phoneNumberFormat.length() - 3, phoneNumberFormat.length());
    }

    public static boolean isNullOrEmpty(CharSequence error) {
        if (error == null)
            return true;
        if (error.equals(EMPTY))
            return true;
        return false;
    }

    public static boolean isEmailValid(String emailStr) {
        Matcher matcher = VALID_EMAIL_ADDRESS_REGEX.matcher(emailStr);
        if (!android.text.TextUtils.isEmpty(emailStr) && !matcher.matches()) {
            return false;
        }
        return true;
    }

    public static String unCapital(String s){
        if(s== null){
            return "";
        }
        try {
            String b = s.substring(0, 1).toLowerCase() + s.substring(1);
            return b;
        }catch (Exception e){
            return s;
        }
    }

    public static String getErrorMessage(String message, boolean isEnglish) {
        String error = message;
        if (!TextUtils.isNullOrEmpty(message)) {
            List<String> list = Arrays.asList(message.split("\\|"));
            if (isEnglish && list.size() > 0) {
                error = list.get(0);
            } else if (!isEnglish && list.size() > 1) {
                error = list.get(1);
            }
        }
        return error;
    }
}
