﻿INSERT INTO dbo.Agent
        ( FirstName ,
          MiddleName ,
          LastName ,
          Gender ,
          BirthDate ,
          Email
        )
SELECT 'Baron Patrick', 'Tablan', 'Paredes', 'M', '09/01/1986', 'baronp@magenic.com'

INSERT INTO dbo.DebitCreditTransaction
        ( AgentId ,
          Amount ,
          Remarks ,
          TransactionTypeId ,
          TransactionDateTime ,
          IsDeleted
        )
SELECT 1, 1000, 'Credit', 1, GETDATE(), 0 UNION ALL
SELECT 1, -100, 'Debit', 1, GETDATE(), 0 UNION ALL
SELECT 1, 1000, 'Savings', 2, GETDATE(), 0

INSERT INTO dbo.ApprovalTransaction
        ( BankId ,
          CardCategoryId ,
          AgentId ,
          Units ,
          Amount ,
          ProductType ,
          ReferenceNumber1 ,
          ReferenceNumber2 ,
          Client ,
          ApprovalDate ,
          BatchId ,
          IsDeleted
        )
SELECT 1, 1, 1, 1, 1800, 'VISA CLASSIC', '0017102017205020227A0', NULL, 'MACATANGAY, MA LOURDES', GETDATE(), NULL, 0 UNION ALL
SELECT 1, 1, 1, 1, 1800, 'MASTERCARD PLATINUM', '0017102017198010358A0', NULL, 'LLANES, BERNADETTE', GETDATE(), NULL, 0