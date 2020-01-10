//
//  UIImageExtension.swift
//  ami-ios-base
//
//  Created by Viliam Straka on 8/12/2560 BE.
//  Copyright © 2560 Ascend. All rights reserved.
//

import UIKit

extension UIImage {
    
    public convenience init?(name: String, inBundle: Bundle? = nil) {
        var bundle = Bundle.main
        if let inBundle = inBundle {
            bundle = inBundle
        } else if let useClass = Utils.callingClass() {
            bundle = Bundle(for: useClass)
        }
        
        let image = UIImage(named: name, in: bundle, compatibleWith: nil)
        if image != nil {
            self.init(named: name, in: bundle, compatibleWith: nil)
        } else {
            if bundle !== Bundle.main {
                self.init(named: name, in: Bundle.main, compatibleWith: nil)
            } else {
                self.init()
            }
        }
    }
    
    public convenience init(view: UIView) {
        UIGraphicsBeginImageContext(view.frame.size)
        view.layer.render(in:UIGraphicsGetCurrentContext()!)
        let image = UIGraphicsGetImageFromCurrentImageContext()
        UIGraphicsEndImageContext()
        self.init(cgImage: image!.cgImage!)
    }
  
    public func maskWithColor(color: UIColor) -> UIImage {
        UIGraphicsBeginImageContextWithOptions(self.size, false, UIScreen.main.scale)
        let context = UIGraphicsGetCurrentContext()
        
        color.setFill()
        
        context!.translateBy(x: 0, y: self.size.height)
        context!.scaleBy(x: 1.0, y: -1.0)
        
        context!.setBlendMode(CGBlendMode.colorBurn)
        let rect = CGRect(x: 0, y: 0, width: self.size.width, height: self.size.height)
        context!.draw(self.cgImage!, in: rect)
        
        context!.setBlendMode(CGBlendMode.sourceIn)
        context!.addRect(rect)
        context!.drawPath(using: CGPathDrawingMode.fill)
        
        let coloredImage = UIGraphicsGetImageFromCurrentImageContext()
        UIGraphicsEndImageContext()
        
        return coloredImage!
    }
}
