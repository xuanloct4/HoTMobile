//
//  LocalizeText.swift
//  ami-ios-regional-base
//
//  Created by  Thế Anh  on 12/2/19.
//  Copyright © 2019 loctv. All rights reserved.
//

import Foundation

public class LocalizeText {
    private init() { }
    public static let shared = LocalizeText()
    
    public var versionLocalization: String = ""
    
    public var dicLocalize = [String: Any]()
    
    public func getTextFromFile(keyName: String) -> String? {
        let currenLanguage = ApplicationData.shared.selectedLanguage
        let dicLocalizeData = LocalizeText.shared.dicLocalize
        if let localizeByKey = dicLocalizeData[keyName] as? [String: Any] {
            return localizeByKey[currenLanguage] as? String
        }
        return nil
    }
}
