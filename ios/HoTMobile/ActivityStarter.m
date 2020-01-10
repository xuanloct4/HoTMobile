//
//  ActivityStarter.m
//  HoTMobile
//
//  Created by loctv on 1/2/20.
//  Copyright © 2020 Facebook. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "ActivityStarter.h"
#import "HoTMobile-Swift.h"

@implementation ActivityStarter
// To export a module named CalendarManager
RCT_EXPORT_MODULE();
// This would name the module ActivityStarter instead
// RCT_EXPORT_MODULE(ActivityStarter);

RCT_EXPORT_METHOD(getRandomUUID:(RCTResponseSenderBlock)callback) {
  callback(@[[Utils randomStringWithLength:32]]);
}

RCT_EXPORT_METHOD(getRamdomNumber:(NSInteger)max :(RCTResponseSenderBlock)callback) {
  callback(@[[NSNumber numberWithInteger:[Utils randomIntWithMin:1 max:max]]]);
}

RCT_EXPORT_METHOD(setLanguage:(NSString *)language) {  }

//RCT_EXPORT_METHOD(encryptRSA:(NSString *)plaintext :(NSString *)pub_key :(RCTResponseSenderBlock)callback) {
//  callback(@[[NSNull null], @""]);
//}
//
//RCT_EXPORT_METHOD(decryptRSA:(NSString *)plaintext :(NSString *)pub_key :(RCTResponseSenderBlock)callback) {
//  callback(@[[NSNull null], @""]);
//}

RCT_EXPORT_METHOD(getDeviceName:(RCTResponseSenderBlock)callback) {
  callback(@[[Utils getDeviceName]]);
}

RCT_EXPORT_METHOD(getSerialNumber:(RCTResponseSenderBlock)callback) {
  callback(@[[Utils getSerialNumber]]);
}

RCT_EXPORT_METHOD(getFirmwareVersion:(RCTResponseSenderBlock)callback) {
  callback(@[[Utils getDeviceModel]]);
}

RCT_EXPORT_METHOD(getDeviceId:(RCTResponseSenderBlock)callback) {
  callback(@[[Utils deviceID]]);
}

RCT_EXPORT_METHOD(getDeviceDes:(RCTResponseSenderBlock)callback) {
  callback(@[[Utils getDeviceDes]]);
}

//RCT_EXPORT_METHOD(getScreenWidth:(RCTResponseSenderBlock)callback) {
//  callback(@[[NSNull null], @""]);
//}
//
//RCT_EXPORT_METHOD(getScreenHeight:(RCTResponseSenderBlock)callback) {
//  callback(@[[NSNull null], @""]);
//}

RCT_EXPORT_METHOD(getOSName:(RCTResponseSenderBlock)callback) {
  callback(@[[Utils getOSName]]);
}

RCT_EXPORT_METHOD(getOSVersion:(RCTResponseSenderBlock)callback) {
  callback(@[[Utils getOSVersion]]);
}

// RCT_EXPORT_METHOD(getUniqueIMEIId:(RCTResponseSenderBlock)callback) {
//    callback(@[[NSNull null], @""]);
//}

//RCT_EXPORT_METHOD(getMACAddress:(NSString *)interfaceName :(RCTResponseSenderBlock)callback) {
//  callback(@[[NSNull null], @""]);
//}

RCT_EXPORT_METHOD(getIPAddress:(RCTResponseSenderBlock)callback) {
  callback(@[[Utils getIPAddress]]);
}

RCT_EXPORT_METHOD(getCurrentTime:(RCTResponseSenderBlock)callback) {
  callback(@[[Utils getCurrentTime]]);
}

@end
