﻿PRINT '********************************************************************************************************************************************'
PRINT '********************************************************************************************************************************************'
PRINT '********************************************************************************************************************************************'
PRINT 
'
 _______  _______  ______    ______     _______  _______  _______  ___   _ 
|       ||   _   ||    _ |  |      |   |       ||       ||   _   ||   | | |
|       ||  |_|  ||   | ||  |  _    |  |    _  ||    ___||  |_|  ||   |_| |
|       ||       ||   |_||_ | | |   |  |   |_| ||   |___ |       ||      _|
|      _||       ||    __  || |_|   |  |    ___||    ___||       ||     |_ 
|     |_ |   _   ||   |  | ||       |  |   |    |   |___ |   _   ||    _  |
|_______||__| |__||___|  |_||______|   |___|    |_______||__| |__||___| |_|                                                               
'
PRINT '********************************************************************************************************************************************'
PRINT '********************************************************************************************************************************************'
PRINT '********************************************************************************************************************************************'
PRINT 'Environment: $(Environment)'

:r Script/Script.PopulateReferenceTypes.sql
GO

:r Script/Script.PopulateBanks.sql
GO

:r Script/Script.PopulateCardCategories.sql
GO

:r Script/Script.PopulateDefaultRates.sql
GO