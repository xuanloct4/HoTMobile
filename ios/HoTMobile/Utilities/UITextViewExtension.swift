//
//  UITextViewExtension.swift
//  ami-ios-base
//
//  Created by loctv on 12/17/18.
//  Copyright © 2018 Ascend. All rights reserved.
//

import UIKit

extension UITextView {
    public func adjustUITextViewHeight() {
        self.translatesAutoresizingMaskIntoConstraints = true
        self.sizeToFit()
        self.isScrollEnabled = false
    }
    
    public var numberOfVisibleLines: Int {
        let rHeight: Int = lroundf(Float(self.actualHeight))
        let fontSize = self.font?.pointSize ?? 16
        let charSize: Int = lroundf(Float(fontSize))
        return rHeight / charSize
    }
    
    public var actualHeight: CGFloat {
        let textSize = CGSize(width: CGFloat(self.frame.size.width), height: CGFloat(MAXFLOAT))
        return self.sizeThatFits(textSize).height
    }
}
