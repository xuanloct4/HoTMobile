//
//  StringExtensions.swift
//  ami-ios-base
//
//  Created by Viliam Straka on 8/12/2560 BE.
//  Copyright © 2560 Ascend. All rights reserved.
//

import UIKit
extension String {
    public func convertToASCII() -> String {
        //        let uniCodeStr = String(utf8String: self.cString(using: .nonLossyASCII)!)
        //        return uniCodeStr ?? self
        
        var standard = self.replacingOccurrences(of: "đ", with: "d")
        standard = standard.replacingOccurrences(of: "Đ", with: "D")
        standard = standard.replacingOccurrences(of: "₫", with: "d")
        let decode = standard.data(using: .ascii, allowLossyConversion: true)
        let ansi = String(data: decode!, encoding: .ascii)
        return ansi ?? self
    }
    
    public func validateRegex(_ regex: String) -> Bool {
        let test = NSPredicate(format:"SELF MATCHES %@", regex)
        return test.evaluate(with: self)
    }
 
    public func range(subString: String, options: NSRegularExpression.Options = []) -> [NSRange] {
        var result = [NSRange]()
        let range = NSRange(location: 0, length: self.count)
        do {
            let regex = try NSRegularExpression(pattern: subString, options: options)
            for match in regex.matches(in: self, options: .withTransparentBounds, range: range) {
                result.append(match.range)
            }
        } catch _ {
            NSLog("Error creating regular expresion")
        }
        return result
    }
    
    public func height(withConstrainedWidth width: CGFloat, font: UIFont) -> CGFloat {
        let constraintRect = CGSize(width: width, height: .greatestFiniteMagnitude)
        let boundingBox = self.boundingRect(with: constraintRect, options: .usesLineFragmentOrigin, attributes: [NSAttributedString.Key.font: font], context: nil)
        return ceil(boundingBox.height)
    }
}

extension StringProtocol where Index == String.Index {
    public func index<T: StringProtocol>(of string: T, options: String.CompareOptions = []) -> Index? {
        return range(of: string, options: options)?.lowerBound
    }
    
    public func endIndex<T: StringProtocol>(of string: T, options: String.CompareOptions = []) -> Index? {
        return range(of: string, options: options)?.upperBound
    }
    
    public func indexes<T: StringProtocol>(of string: T, options: String.CompareOptions = []) -> [Index] {
        var result: [Index] = []
        var start = startIndex
        while start < endIndex, let range = range(of: string, options: options, range: start..<endIndex) {
            result.append(range.lowerBound)
            start = range.lowerBound < range.upperBound ? range.upperBound : index(range.lowerBound, offsetBy: 1, limitedBy: endIndex) ?? endIndex
        }
        return result
    }
    
    public func ranges<T: StringProtocol>(of string: T, options: String.CompareOptions = []) -> [Range<Index>] {
        var result: [Range<Index>] = []
        var start = startIndex
        while start < endIndex, let range = range(of: string, options: options, range: start..<endIndex) {
            result.append(range)
            start = range.lowerBound < range.upperBound  ? range.upperBound : index(range.lowerBound, offsetBy: 1, limitedBy: endIndex) ?? endIndex
        }
        return result
    }
}

