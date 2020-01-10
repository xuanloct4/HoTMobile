//
//  UIColorExtension.swift
//  ami-ios-base
//
//  Created by Viliam Straka on 4/12/2560 BE.
//  Copyright © 2560 Ascend. All rights reserved.
//

import UIKit

enum UIColorPredefine: String {
    case main = "112233"
       
    public func getColor() -> UIColor {
        return UIColor.init(hex: self.rawValue)
    }
}


extension UIColor {
    public convenience init(hex: String) {
        self.init(hex: Int(hex, radix: 16) ?? 0)
    }
    public convenience init(hexa: String) {
        self.init(hexa: Int(hexa, radix: 16) ?? 0)
    }
    public convenience init(hex: Int) {
        self.init(red: CGFloat((hex>>16)&0xFF)/255.0,
                  green: CGFloat((hex>>8)&0xFF)/255.0,
                  blue: CGFloat((hex)&0xFF)/255.0,
                  alpha:  1.0)
    }
    public convenience init(hexa: Int) {
        self.init(red: CGFloat((hexa>>24)&0xFF)/255.0,
                  green: CGFloat((hexa>>16)&0xFF)/255.0,
                  blue: CGFloat((hexa>>8)&0xFF)/255.0,
                  alpha:  CGFloat((hexa)&0xFF)/255.0)
    }
}



