{-# LANGUAGE DataKinds #-}
{-# LANGUAGE TypeApplications #-}
{-# LANGUAGE OverloadedStrings #-}

import           Plutus.Contract as Contract 
import           Data.Map (Map)
import qualified PlutusTx
import           Ledger


data FarmDatum = CropPlanning | SoilTesting | IrrigationManagement | PestControl
    

data FarmAction = StartPlanning | CompletePlanning | StartTesting | CompleteTesting | StartIrrigation | CompleteIrrigation | StartPestControl | CompletePestControl
    deriving (Show, Eq)

framTransaction :: FarmDatum -> State -> FarmeAction -> Maybe ()
framTransaction currentDatum action = 
                 case currentDatum, action


farmMachine  :: StateMachine -> FarmDatum -> FarmAction
farmMachine = SM.mkstatemachine framTransaction

farmValidator ::  Scripts.ValidatorType   
farmValidator = SM.mkValidator farmMachine 

farmStateMachineInstance :: SM.StateMachineInstance FarmDatum FarmAction
farmStateMachineInstance = SM.StateMachineInstance farmMachine farmValidator


farmEndpoint :: Contract (Last (BuiltinData (StateMachine FarmDatum FarmAction))) SM.SMContractError ()
farmEndpoint = do


 machineInstance <- SM.runInitialiseWithMem farmMachine []
    void $ SM.awaitPromise machineInstance


 