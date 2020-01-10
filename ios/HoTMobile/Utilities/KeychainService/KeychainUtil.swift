//
//  KeychainUtil.swift
//  ami-ios-base
//
//  Created by loctv on 11/27/18.
//  Copyright © 2018 Ascend. All rights reserved.
//

import UIKit

public class KeychainUtil: NSObject {

    public class func readPassword(accountName: String?) -> String? {
        // If an account name has been set, read any existing password from the keychain.
        if let accountName = accountName {
            do {
                let passwordItem = KeychainPasswordItem(service: KeychainConfiguration.serviceName, account: accountName, accessGroup: KeychainConfiguration.accessGroup)
                
                let password = try passwordItem.readPassword()
                return password
            }
            catch {
                fatalError("Error reading password from keychain - \(error)")
            }
        }
        return nil
    }
    
    public class func readPasswords() -> [KeychainPasswordItem]? {
        do {
            let passwordItems = try KeychainPasswordItem.passwordItems(forService: KeychainConfiguration.serviceName, accessGroup: KeychainConfiguration.accessGroup)
            return passwordItems
        }
        catch {
            fatalError("Error fetching password items - \(error)")
        }
        return nil
    }
    
    public class func save(accountName: String, password: String, oldAccountName: String? = nil) {
        // Check if we need to update an existing item or create a new one.
        do {
            if let originalAccountName = oldAccountName {
                // Create a keychain item with the original account name.
                var passwordItem = KeychainPasswordItem(service: KeychainConfiguration.serviceName, account: originalAccountName, accessGroup: KeychainConfiguration.accessGroup)
                
                // Update the account name and password.
                try passwordItem.renameAccount(accountName)
                try passwordItem.savePassword(password)
            }
            else {
                // This is a new account, create a new keychain item with the account name.
                let passwordItem = KeychainPasswordItem(service: KeychainConfiguration.serviceName, account: accountName, accessGroup: KeychainConfiguration.accessGroup)
                
                // Save the password for the new item.
                try passwordItem.savePassword(password)
            }
        }
        catch {
            fatalError("Error updating keychain - \(error)")
        }
    }
}
