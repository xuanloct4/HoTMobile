//
//  UIViewExtension.swift
//  ami-ios-base
//
//  Created by Viliam Straka on 6/12/2560 BE.
//  Copyright © 2560 Ascend. All rights reserved.
//

import UIKit
import CommonCrypto

var ViewStyleTypeKey: UInt8 = 0

public enum GradientDirection {
    case leftToRight
    case rightToLeft
    case topToBottom
    case bottomToTop
}

extension UIView {
    public func gradientBackground(from color1: UIColor, to color2: UIColor, direction: GradientDirection) {
        let gradient = CAGradientLayer()
        gradient.frame = self.bounds
        gradient.colors = [color1.cgColor, color2.cgColor]
        
        switch direction {
        case .leftToRight:
            gradient.startPoint = CGPoint(x: 0.0, y: 0.5)
            gradient.endPoint = CGPoint(x: 1.0, y: 0.5)
        case .rightToLeft:
            gradient.startPoint = CGPoint(x: 1.0, y: 0.5)
            gradient.endPoint = CGPoint(x: 0.0, y: 0.5)
        case .bottomToTop:
            gradient.startPoint = CGPoint(x: 0.5, y: 1.0)
            gradient.endPoint = CGPoint(x: 0.5, y: 0.0)
        default:
            break
        }
        
        self.layer.insertSublayer(gradient, at: 0)
    }
    
    public func roundCorner() {
        if self.frame.size.height > self.frame.size.width {
            self.layer.cornerRadius = self.frame.size.width/2
        } else {
            self.layer.cornerRadius = self.frame.size.height/2
        }
        self.clipsToBounds = true
    }
    
    public func draw(text: String, fontSize: CGFloat, textColor: UIColor) {
//        let renderer = UIGraphicsImageRenderer(size: CGSize(width: 60, height: 60))
//        let img = renderer.image { ctx in
        let paragraphStyle = NSMutableParagraphStyle()
        paragraphStyle.alignment = .center
        
        let attributes = [
            NSAttributedString.Key.paragraphStyle: paragraphStyle,
            NSAttributedString.Key.font: UIFont.systemFont(ofSize: fontSize),
            NSAttributedString.Key.foregroundColor: textColor
        ]

        let attributedString = NSAttributedString(string: text, attributes: attributes)
        
        let stringRect = CGRect(x: 20, y: 20, width: self.frame.size.width - 20, height: self.frame.size.height - 20)
        attributedString.draw(in: stringRect)
//        }
    }
}

extension UIView {    
    public func layoutAttachAll(to parentView:UIView, top:CGFloat? = 0, right:CGFloat? = 0, bottom:CGFloat? = 0, left:CGFloat? = 0)
    {
        var constraints = [NSLayoutConstraint]()
        self.translatesAutoresizingMaskIntoConstraints = false
        if let top = top {
            constraints.append(NSLayoutConstraint(item: self, attribute: .top, relatedBy: .equal, toItem: parentView, attribute: .top, multiplier: 1.0, constant: top))
        }
        if let right = right {
            constraints.append(NSLayoutConstraint(item: self, attribute: .right, relatedBy: .equal, toItem: parentView, attribute: .right, multiplier: 1.0, constant: right))
        }
        if let bottom = bottom {
            constraints.append(NSLayoutConstraint(item: self, attribute: .bottom, relatedBy: .equal, toItem: parentView, attribute: .bottom, multiplier: 1.0, constant: bottom))
        }
        if let left = left {
            constraints.append(NSLayoutConstraint(item: self, attribute: .left, relatedBy: .equal, toItem: parentView, attribute: .left, multiplier: 1.0, constant: left))
        }
        parentView.addConstraints(constraints)
    }
    
    public func getSuperview<T>() -> T? {
        var i = 0
        var realSuperview = self.superview
        var testSuperview:T? = realSuperview as? T
        
        while i < 10 {
            if realSuperview == nil {
                return nil
            } else if testSuperview != nil {
                return testSuperview
            } else {
                realSuperview = realSuperview!.superview
                testSuperview = realSuperview as? T
            }
            i += 1
        }
        return nil
    }
    
    
   public func sizeFontToFit(preferFontSize: CGFloat? = nil, minimumFontSize: CGFloat = 9) -> UIFont {
    var currentTitle = ""
    var currentFont:UIFont?
    var bestFont:UIFont!
    var preferFont:UIFont!
    let minSize = minimumFontSize
    var maxSize = minimumFontSize

    self.layoutIfNeeded()
    if let button = self as? UIButton, let text = button.currentTitle, let label = button.titleLabel {
        currentTitle = text
        currentFont = label.font
    } else if let label = self as? UILabel, let text = label.text {
        currentTitle = text
        currentFont = label.font
    } else if let textField = self as? UITextField, let text = textField.text, let font = textField.font {
        currentTitle = text
        currentFont = font
    }
    
    if let currentFont = currentFont {
        if let preferFontSize = preferFontSize {
            preferFont = UIFont(name: currentFont.fontName, size: preferFontSize)
            maxSize = preferFontSize
        } else {
            preferFont = currentFont
            maxSize = currentFont.pointSize
        }
    } else {
        if let preferFontSize = preferFontSize {
            preferFont = UIFont.systemFont(ofSize: preferFontSize)
            maxSize = preferFontSize
        } else {
            preferFont = UIFont.systemFont(ofSize: minimumFontSize)
            maxSize = minimumFontSize
        }
    }
    
    let textSize = currentTitle.size(withAttributes: [.font: preferFont as Any])
    let _minSize = Int(minSize)
    let _maxSize = Int(maxSize)
    if textSize.width > self.frame.width && _minSize < _maxSize {
        for i in 0..<(_maxSize - _minSize + 1) {
            let _size = _maxSize - i
            if let _font = UIFont(name: preferFont.fontName, size: CGFloat(_size)) {
                let sizeWithFont = currentTitle.size(withAttributes: [.font: _font])
                if sizeWithFont.width < self.frame.width {
                    preferFont = _font
                    break
                }
            }
        }
    }
    bestFont = preferFont
    return bestFont
    }
    
    public func clearConstraints() {
        for subview in self.subviews {
            subview.clearConstraints()
        }
        self.removeConstraints(self.constraints)
    }
    
    public func removeAllConstraints() {
        self.removeConstraints(self.constraints)
    }
    
    public func clearBackground() {
        self.backgroundColor = UIColor.clear
        let sub = self.subviews
        for v in sub {
            v.clearBackground()
        }
    }
    
}
