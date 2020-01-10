//
//  Utils.swift
//  HoTMobile
//
//  Created by loctv on 1/2/20.
//  Copyright © 2020 Facebook. All rights reserved.
//

import UIKit

public enum Network: String {
  case wifi = "en0"
  case cellular = "pdp_ip0"
  case ipv4 = "ipv4"
  case ipv6 = "ipv6"
}

public class Utils: NSObject {
  @objc
  public class func getWindow() -> UIWindow? {
      var window = UIApplication.shared.keyWindow
      if window == nil {
          window = UIApplication.shared.windows[0]
      }
      return window
  }
  
  @objc
  public class func getTopVC() -> UIViewController? {
      guard let window = getWindow(), var rootVC = window.rootViewController else {
          return nil
      }
      if let rootNC = rootVC as? UINavigationController, let lastVC = rootNC.viewControllers.last {
          rootVC = lastVC
      }
      
      while let presentedViewController = rootVC.presentedViewController {
          rootVC = presentedViewController
      }
      
      if let rootNC = rootVC as? UINavigationController, let lastVC = rootNC.viewControllers.last {
          rootVC = lastVC
      }
      
      return rootVC
  }
  
  @objc
  public class func classFromName(_ name: String) -> AnyClass? {
      guard
          let classfromName = NSClassFromString(name.replacingOccurrences(of: "-", with: "_")) as? NSObject.Type else {
              return nil
      }
      return classfromName
  }
  
  @objc
  public class func callingClass() -> AnyClass? {
      guard
          let className = CallStackAnalyser.getCallingClassAndMethodInScope()?.className,
          let classFromName = self.classFromName(className) else {
          return nil
      }
      
      return classFromName
  }
  
  @objc
  public class func hideKeyboard(_ force: Bool = false) {
    if force {
      UIApplication.shared.sendAction(#selector(UIResponder.resignFirstResponder), to: nil, from: nil, for: nil)
    } else {
      let when = DispatchTime.now() + 0.1
      DispatchQueue.main.asyncAfter(deadline: when) {
        UIApplication.shared.sendAction(#selector(UIResponder.resignFirstResponder), to: nil, from: nil, for: nil)
      }
    }
  }
  
  @objc
  public class func randomString(length: Int = 35) -> String {
    let letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    return String((0..<length).map{ _ in letters.randomElement()! })
  }
  
  
  @objc
  public class func deviceID() -> String {
    #if targetEnvironment(simulator)
    return "10A5322A-EB39-4137-B713-123456-123"
    #else
    return UIDevice.current.identifierForVendor!.uuidString
    #endif
  }
  
  @objc
  public class func appVersion() -> String {
    let nsObject: AnyObject? = Bundle.main.infoDictionary?["CFBundleShortVersionString"] as AnyObject
    guard let version = nsObject as? String else {
      return ""
    }
    return version
  }
  
  @objc
  public class func randomInt(min: Int = 1, max: Int = 999999999) -> Int {
    guard min < max else {return min}
    return Int(arc4random_uniform(UInt32(1 + max - min))) + min
  }
  
  @objc
  public class func getDeviceName() -> String {
    return UIDevice.current.name
  }
  
  @objc
  public class func getDeviceModel() -> String {
    return UIDevice.current.model
  }
  
  @objc
  public class func getDeviceDes() -> String {
    return UIDevice.current.localizedModel
  }
  
  @objc
  public class func getSerialNumber() -> String {
    return UIDevice.current.identifierForVendor?.uuidString ?? ""
  }
  
  @objc
  public class func getOSName() -> String {
    return UIDevice.current.systemName
  }
  
  @objc
  public class func getOSVersion() -> String {
    return UIDevice.current.systemVersion
  }
  
  
  // Return IP address of WiFi interface (en0) as a String
  @objc
  public class func getIPAddress() -> String {
    if let wifiAdd = Utils.getIPAddress(for: Network.wifi) {
      return wifiAdd;
    } else if let cellularAdd = Utils.getIPAddress(for: Network.cellular) {
      return cellularAdd;
    } else {
      return "";
    }
  }
  
  public class func getIPAddress(for network: Network) -> String? {
    var address: String?
    
    // Get list of all interfaces on the local machine:
    var ifaddr: UnsafeMutablePointer<ifaddrs>?
    guard getifaddrs(&ifaddr) == 0 else { return nil }
    guard let firstAddr = ifaddr else { return nil }
    
    // For each interface ...
    for ifptr in sequence(first: firstAddr, next: { $0.pointee.ifa_next }) {
      let interface = ifptr.pointee
      
      // Check for IPv4 or IPv6 interface:
      let addrFamily = interface.ifa_addr.pointee.sa_family
      if addrFamily == UInt8(AF_INET) || addrFamily == UInt8(AF_INET6) {
        
        // Check interface name:
        let name = String(cString: interface.ifa_name)
        if name == network.rawValue {
          
          // Convert interface address to a human readable string:
          var hostname = [CChar](repeating: 0, count: Int(NI_MAXHOST))
          getnameinfo(interface.ifa_addr, socklen_t(interface.ifa_addr.pointee.sa_len),
                      &hostname, socklen_t(hostname.count),
                      nil, socklen_t(0), NI_NUMERICHOST)
          address = String(cString: hostname)
        }
      }
    }
    freeifaddrs(ifaddr)
    
    return address
  }
  
  @objc
  public class func getWifiAddress() -> String {
    return Utils.getIPAddress(for: Network.wifi) ?? ""
  }
  
  @objc
  public class func getCellularAddress() -> String {
    return Utils.getIPAddress(for: Network.cellular) ?? ""
  }
  
  @objc
  public class func getCurrentTime() -> String {
    return DateUtils.dateString(date: Date(), dateFormat: DateUtils.dateFormatter)
  }
}
