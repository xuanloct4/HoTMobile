//
//  AppState.swift
//  ami-ios-base
//
//  Created by Viliam Straka on 4/12/2560 BE.
//  Copyright © 2560 Ascend. All rights reserved.
//

import UIKit
public class ApplicationData {
    private init() { }
    static let shared = ApplicationData()
    
    private var deviceToken: String?
    func setDeviceToken(_ deviceToken: String?) {
        self.deviceToken = deviceToken
    }
    
    func getDeviceToken() -> String? {
        return self.deviceToken
    }
    
    var baseBundle = Bundle.init(for: ApplicationData.self)
    public var defaultTimeout :TimeInterval = 30
    public let pinLength = 6
    public let otpLength = 6
    public let appVersion : Any! = Bundle.main.object(forInfoDictionaryKey: "CFBundleShortVersionString")
    public let appBuild : Any! = Bundle.main.object(forInfoDictionaryKey: "CFBundleVersion")
    public let appBundleID : String! = Bundle.main.bundleIdentifier
    public let urlAppInAppStore: String = "itms-apps://itunes.apple.com/vn/app/apple-store/id1373551047?mt=8"
    let mobileNumberPattern = "###-###-####"
    
    public var selectedLanguage: String {
        get {
            if let language = UserDefaults.standard.object(forKey: Constants.KEY_LANGUAGE) as? String {
                return language
            }
            return "en"
        }
        set {
            UserDefaults.standard.set(newValue, forKey: Constants.KEY_LANGUAGE)
            UserDefaults.standard.synchronize()
        }
    }
    
    func clear() {

    }
}
