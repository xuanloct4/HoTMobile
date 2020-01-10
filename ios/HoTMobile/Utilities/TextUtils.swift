//
//  TextUtils.swift
//  ami-ios-base
//
//  Created by loctv on 12/21/17.
//  Copyright © 2017 Ascend. All rights reserved.
//

import UIKit
import SwiftyRSA

extension String
{
    public func trim() -> String
    {
        return self.trimmingCharacters(in: NSCharacterSet.whitespaces)
    }
    
    public func startsWith(string: String) -> Bool {
        return lowercased().hasPrefix(string.lowercased())
    }
    
    public func capitalizeFirstLetter() -> String{
        return prefix(1).uppercased() + dropFirst()
    }
}

public class TextUtils: NSObject {
    public static func isEmpty(_ text:String?) -> Bool {
        guard let text = text else { return true }
        let trimmedText = text.trim()
        return (trimmedText == "")
    }
    
    public static func phoneNumberFormat(_ phone:String) -> String {
        let index: String.Index = phone.index(phone.startIndex, offsetBy: 1)
        if phone.startsWith(string: "+") {
            let number:String = String(phone[index...])
            return "+ " + TextUtils.phoneNumberFormat(_: number)
        } else {
            return ApplicationData.shared.mobileNumberPattern
        }
    }
    
    public static func formatCurrency(value: Int64, numberOfDigit: Int, separator: String) -> String {
        if numberOfDigit <= 0 { return String(value)}
        var uVal = value
        if value < 0 {
            uVal = -value
        }
        
        let valueString = String(uVal)
        let remainderDigitNumber = valueString.count%numberOfDigit
        let division: Int = valueString.count/numberOfDigit
        let numberOfGroup = division+1
        var k:[String] = [String]()
        
        let startIndex = valueString.index(valueString.startIndex, offsetBy: 0)
        let endIndex = valueString.index(valueString.startIndex, offsetBy: remainderDigitNumber)
        let h = String(valueString[startIndex..<endIndex])
        if h != "" {
            k.append(h)
        }
        if numberOfGroup>1 {
            for i in 1..<numberOfGroup {
                let startIndex = valueString.index(valueString.startIndex, offsetBy: i*3 - 3 + remainderDigitNumber)
                let endIndex = valueString.index(valueString.startIndex, offsetBy: i*3 + remainderDigitNumber)
                k.append(String(valueString[startIndex..<endIndex]))
            }
        }
        var formatedCurrency = k.joined(separator: separator)
        if value < 0 {
            formatedCurrency = "-" + formatedCurrency
        }
        return formatedCurrency
    }
    
    public static func encryptRSA(_ textEncrypt: String) -> String {
        do {
            
            let publicKey = try PublicKey(pemNamed: "public")
            let clear = try ClearMessage(string: textEncrypt, using: .utf8)
            let encrypted = try clear.encrypted(with: publicKey, padding: .PKCS1)
            // Then you can use:
//            let data = encrypted.data
//            let base64String = encrypted.base64String
//            let clearText = try ClearMessage(string: textEncrypt, using: .utf8)
//            let encrypted = try clearText.encrypted(with: PublicKey(pemEncoded: Constants.KEY_ENCRYPT_RSA), padding: Padding.PKCS1MD5)
            return encrypted.base64String
        } catch {
            print(error)
        }
        return ""
    }
    
    public static func getCurrencySymbol(code: String) -> String? {
        let locale = NSLocale(localeIdentifier: code)
        return locale.displayName(forKey: NSLocale.Key.currencySymbol, value: code)
    }
}
