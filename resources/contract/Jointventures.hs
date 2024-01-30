{-# LANGUAGE DeriveGeneric #-}
{-# LANGUAGE TypeApplications #-}
{-# LANGUAGE OverloadedStrings #-}

import           Plutus.Contract as Contract 
import           Data.Map (Map)
import qualified PlutusTx
import Data.Text (Text)


data JointVentureContract = JointVentureContract
    {  ourCompany :: Text
    ,  otherCompany :: Text
    ,  investment    :: Integer
    , profitSharing :: Double 
    }

    executeJointVentureContract :: JointVentureContract -> IO
    executeJointVentureContract = do
         putStrLn "Executing Joint Venture Contract:"
         putStrLn $ "Our Company: " ++ ourCompany contract
         putStrLn $ "Other Company: " ++ otherCompany contract
         putStrLn $ "Investment: " ++ show (investment contract)
         putStrLn $ "Profit Sharing: " ++ show (profitSharing contract)


main :: IO()
main = do
    let sampleJointVentureContract = JointVentureContract
    { ourCompany = "quotus"
    , otherCompany = "abc"
    , Investment = 1000000
    , profitSharing = 1.0
    }
