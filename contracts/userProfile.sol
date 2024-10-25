// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract NaturopuraUserProfile {
    
    // Struct to store user profile details
    struct UserProfile {
        string name;
        string mobileNumber;
        string physicalAddress;
    }

    // Mapping to store profiles linked to each Ethereum address
    mapping(address => UserProfile) private profiles;

    // Event triggered when a user updates their profile
    event ProfileUpdated(
        address indexed userAddress,
        string name,
        string mobileNumber,
        string physicalAddress
    );

    // Function to update or create a user profile
    function updateProfile(
        string memory _name,
        string memory _mobileNumber,
        string memory _physicalAddress
    ) public {
        // Store the user profile data or update if already exists
        profiles[msg.sender] = UserProfile({
            name: _name,
            mobileNumber: _mobileNumber,
            physicalAddress: _physicalAddress
        });

        // Emit the ProfileUpdated event
        emit ProfileUpdated(msg.sender, _name, _mobileNumber, _physicalAddress);
    }

    // Function to fetch user profile
    function getProfile() public view returns (string memory, string memory, string memory) {
        UserProfile storage profile = profiles[msg.sender];
        return (profile.name, profile.mobileNumber, profile.physicalAddress);
    }
}
