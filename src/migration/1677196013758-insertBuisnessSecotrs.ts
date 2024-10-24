import { MigrationInterface, QueryRunner } from 'typeorm';

export class insertBuisnessSecotrs1677196013758 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
INSERT INTO business_sectors(business_id,id,name) VALUES
 (11,111,'Crop Production')
,(11,1111,'Oilseed and Grain Farming')
,(11,1112,'Vegetable and Melon Farming')
,(11,1113,'Fruit and Tree Nut Farming')
,(11,1114,'Greenhouse, Nursery, and Floriculture Production')
,(11,1119,'Other Crop Farming')
,(11,112,'Animal Production and Aquaculture')
,(11,1121,'Cattle Ranching and Farming')
,(11,1122,'Hog and Pig Farming')
,(11,1123,'Poultry and Egg Production')
,(11,1124,'Sheep and Goat Farming')
,(11,1125,'Aquaculture')
,(11,1129,'Other Animal Production')
,(11,113,'Forestry and Logging')
,(11,1131,'Timber Tract Operations')
,(11,1132,'Forest Nurseries and Gathering of Forest Products')
,(11,1133,'Logging')
,(11,114,'Fishing, Hunting and Trapping')
,(11,1141,'Fishing')
,(11,1142,'Hunting and Trapping')
,(11,115,'Support Activities for Agriculture and Forestry')
,(11,1151,'Support Activities for Crop Production')
,(11,1152,'Support Activities for Animal Production')
,(11,1153,'Support Activities for Forestry')
,(21,211,'Oil and Gas Extraction')
,(21,2111,'Oil and Gas Extraction')
,(21,212,'Mining (except Oil and Gas)')
,(21,2121,'Coal Mining')
,(21,2122,'Metal Ore Mining')
,(21,2123,'Nonmetallic Mineral Mining and Quarrying')
,(21,213,'Support Activities for Mining')
,(21,2131,'Support Activities for Mining')
,(22,221,'Utilities')
,(22,2211,'Electric Power Generation, Transmission and Distribution')
,(22,22111,'Electric Power Generation')
,(22,2212,'Natural Gas Distribution')
,(22,2213,'Water, Sewage and Other Systems')
,(23,236,'Construction of Buildings')
,(23,2361,'Residential Building Construction')
,(23,2362,'Nonresidential Building Construction')
,(23,237,'Heavy and Civil Engineering Construction')
,(23,2371,'Utility System Construction')
,(23,2372,'Land Subdivision')
,(23,2373,'Highway, Street, and Bridge Construction')
,(23,2379,'Other Heavy and Civil Engineering Construction')
,(23,238,'Specialty Trade Contractors')
,(23,2381,'Foundation, Structure, and Building Exterior Contractors')
,(23,2382,'Building Equipment Contractors')
,(23,2383,'Building Finishing Contractors')
,(23,2389,'Other Specialty Trade Contractors')
,(3133,311,'Food Manufacturing')
,(3133,3111,'Animal Food Manufacturing')
,(3133,3112,'Grain and Oilseed Milling')
,(3133,3113,'Sugar and Confectionery Product Manufacturing')
,(3133,3114,'Fruit and Vegetable Preserving and Specialty Food Manufacturing')
,(3133,3115,'Dairy Product Manufacturing')
,(3133,3116,'Animal Slaughtering and Processing')
,(3133,3117,'Seafood Product Preparation and Packaging')
,(3133,3118,'Bakeries and Tortilla Manufacturing')
,(3133,3119,'Other Food Manufacturing')
,(3133,312,'Beverage and Tobacco Product Manufacturing')
,(3133,3121,'Beverage Manufacturing')
,(3133,3122,'Tobacco Manufacturing')
,(3133,313,'Textile Mills')
,(3133,3131,'Fiber, Yarn, and Thread Mills')
,(3133,3132,'Fabric Mills')
,(3133,3133,'Textile and Fabric Finishing and Fabric Coating Mills')
,(3133,314,'Textile Product Mills')
,(3133,3141,'Textile Furnishings Mills')
,(3133,3149,'Other Textile Product Mills')
,(3133,315,'Apparel Manufacturing')
,(3133,3151,'Apparel Knitting Mills')
,(3133,3152,'Cut and Sew Apparel Manufacturing')
,(3133,3159,'Apparel Accessories and Other Apparel Manufacturing')
,(3133,316,'Leather and Allied Product Manufacturing')
,(3133,3161,'Leather and Hide Tanning and Finishing')
,(3133,3162,'Footwear Manufacturing')
,(3133,3169,'Other Leather and Allied Product Manufacturing')
,(3133,321,'Wood Product Manufacturing')
,(3133,3211,'Sawmills and Wood Preservation')
,(3133,3212,'Veneer, Plywood, and Engineered Wood Product Manufacturing')
,(3133,32191,'Millwork')
,(3133,3221,'Pulp, Paper, and Paperboard Mills')
,(3133,32211,'Pulp Mills')
,(3133,3222,'Converted Paper Product Manufacturing')
,(3133,323,'Printing and Related Support Activities')
,(3133,3231,'Printing and Related Support Activities')
,(3133,324,'Petroleum and Coal Products Manufacturing')
,(3133,3241,'Petroleum and Coal Products Manufacturing')
,(3133,325,'Chemical Manufacturing')
,(3133,3251,'Basic Chemical Manufacturing')
,(3133,3252,'Resin, Synthetic Rubber, and Artificial and Synthetic Fibers and Filaments Manufacturing')
,(3133,3253,'Pesticide, Fertilizer, and Other Agricultural Chemical Manufacturing')
,(3133,3254,'Pharmaceutical and Medicine Manufacturing')
,(3133,3255,'Paint, Coating, and Adhesive Manufacturing')
,(3133,3256,'Soap, Cleaning Compound, and Toilet Preparation Manufacturing')
,(3133,3259,'Other Chemical Product and Preparation Manufacturing')
,(3133,326,'Plastics and Rubber Products Manufacturing')
,(3133,3261,'Plastics Product Manufacturing')
,(3133,3262,'Rubber Product Manufacturing')
,(3133,327,'Nonmetallic Mineral Product Manufacturing')
,(3133,3271,'Clay Product and Refractory Manufacturing')
,(3133,3272,'Glass and Glass Product Manufacturing')
,(3133,3273,'Cement and Concrete Product Manufacturing')
,(3133,3274,'Lime and Gypsum Product Manufacturing')
,(3133,3279,'Other Nonmetallic Mineral Product Manufacturing')
,(3133,331,'Primary Metal Manufacturing')
,(3133,3311,'Iron and Steel Mills and Ferroalloy Manufacturing')
,(3133,3312,'Steel Product Manufacturing from Purchased Steel')
,(3133,3313,'Alumina and Aluminum Production and Processing')
,(3133,3314,'Nonferrous Metal (except Aluminum) Production and Processing')
,(3133,3315,'Foundries')
,(3133,332,'Fabricated Metal Product Manufacturing')
,(3133,3321,'Forging and Stamping')
,(3133,3322,'Cutlery and Handtool Manufacturing')
,(3133,3323,'Architectural and Structural Metals Manufacturing')
,(3133,3324,'Boiler, Tank, and Shipping Container Manufacturing')
,(3133,3325,'Hardware Manufacturing')
,(3133,3326,'Spring and Wire Product Manufacturing')
,(3133,3327,'Machine Shops, Turned Product, and Screw, Nut, and Bolt Manufacturing')
,(3133,3328,'Coating, Engraving, Heat Treating, and Allied Activities')
,(3133,3329,'Other Fabricated Metal Product Manufacturing')
,(3133,333,'Machinery Manufacturing')
,(3133,3331,'Agriculture, Construction, and Mining Machinery Manufacturing')
,(3133,3332,'Industrial Machinery Manufacturing')
,(3133,3333,'Commercial and Service Industry Machinery Manufacturing')
,(3133,3334,'Ventilation, Heating, Air-Conditioning, and Commercial Refrigeration Equipment Manufacturing')
,(3133,3335,'Metalworking Machinery Manufacturing')
,(3133,3336,'Engine, Turbine, and Power Transmission Equipment Manufacturing')
,(3133,3339,'Other General Purpose Machinery Manufacturing')
,(3133,334,'Computer and Electronic Product Manufacturing')
,(3133,3341,'Computer and Peripheral Equipment Manufacturing')
,(3133,3342,'Communications Equipment Manufacturing')
,(3133,3343,'Audio and Video Equipment Manufacturing')
,(3133,3344,'Semiconductor and Other Electronic Component Manufacturing')
,(3133,3345,'Navigational, Measuring, Electromedical, and Control Instruments Manufacturing')
,(3133,3346,'Manufacturing and Reproducing Magnetic and Optical Media')
,(3133,335,'Electrical Equipment, Appliance, and Component Manufacturing')
,(3133,3351,'Electric Lighting Equipment Manufacturing')
,(3133,3352,'Household Appliance Manufacturing')
,(3133,3353,'Electrical Equipment Manufacturing')
,(3133,3359,'Other Electrical Equipment and Component Manufacturing')
,(3133,336,'Transportation Equipment Manufacturing')
,(3133,3361,'Motor Vehicle Manufacturing')
,(3133,3362,'Motor Vehicle Body and Trailer Manufacturing')
,(3133,3363,'Motor Vehicle Parts Manufacturing')
,(3133,3364,'Aerospace Product and Parts Manufacturing')
,(3133,3365,'Railroad Rolling Stock Manufacturing')
,(3133,3366,'Ship and Boat Building')
,(3133,3369,'Other Transportation Equipment Manufacturing')
,(3133,337,'Furniture and Related Product Manufacturing')
,(3133,3371,'Household and Institutional Furniture and Kitchen Cabinet Manufacturing')
,(3133,3372,'Office Furniture (including Fixtures) Manufacturing')
,(3133,337215,'Showcase, Partition, Shelving, and Locker Manufacturing')
,(3133,339,'Miscellaneous Manufacturing')
,(3133,3391,'Medical Equipment and Supplies Manufacturing')
,(3133,3399,'Other Miscellaneous Manufacturing')
,(42,423,'Merchant Wholesalers, Durable Goods')
,(42,4232,'Furniture and Home Furnishing Merchant Wholesalers')
,(42,4233,'Lumber and Other Construction Materials Merchant Wholesalers')
,(42,4234,'Professional and Commercial Equipment and Supplies Merchant Wholesalers')
,(42,4235,'Metal and Mineral (except Petroleum) Merchant Wholesalers')
,(42,4236,'Household Appliances and Electrical and Electronic Goods Merchant Wholesalers')
,(42,4237,'Hardware, and Plumbing and Heating Equipment and Supplies Merchant Wholesalers')
,(42,4238,'Machinery, Equipment, and Supplies Merchant Wholesalers')
,(42,4239,'Miscellaneous Durable Goods Merchant Wholesalers')
,(42,424,'Merchant Wholesalers, Nondurable Goods')
,(42,4241,'Paper and Paper Product Merchant Wholesalers')
,(42,4242,'Drugs and Druggists'' Sundries Merchant Wholesalers')
,(42,4243,'Apparel, Piece Goods, and Notions Merchant Wholesalers')
,(42,4244,'Grocery and Related Product Merchant Wholesalers')
,(42,4245,'Farm Product Raw Material Merchant Wholesalers')
,(42,4246,'Chemical and Allied Products Merchant Wholesalers')
,(42,4247,'Petroleum and Petroleum Products Merchant Wholesalers')
,(42,4248,'Beer, Wine, and Distilled Alcoholic Beverage Merchant Wholesalers')
,(42,4249,'Miscellaneous Nondurable Goods Merchant Wholesalers')
,(42,425,'Wholesale Trade Agents and Brokers')
,(42,4251,'Wholesale Trade Agents and Brokers')
,(4445,441,'Motor Vehicle and Parts Dealers')
,(4445,4411,'Automobile Dealers')
,(4445,4412,'Other Motor Vehicle Dealers')
,(4445,4413,'Automotive Parts, Accessories, and Tire Retailers')
,(4445,442,'Furniture and Home Furnishings Stores')
,(4445,4421,'Furniture Stores')
,(4445,4422,'Home Furnishings Stores')
,(4445,443,'Electronics and Appliance Stores')
,(4445,4431,'Electronics and Appliance Stores')
,(4445,444,'Building Material and Garden Equipment and Supplies Dealers')
,(4445,4441,'Building Material and Supplies Dealers')
,(4445,4442,'Lawn and Garden Equipment and Supplies Retailers')
,(4445,445,'Food and Beverage Retailers')
,(4445,4451,'Grocery and Convenience Retailers')
,(4445,4452,'Specialty Food Retailers')
,(4445,4453,'Beer, Wine, and Liquor Retailers')
,(4445,446,'Health and Personal Care Stores')
,(4445,4461,'Health and Personal Care Stores')
,(4445,447,'Gasoline Stations')
,(4445,4471,'Gasoline Stations')
,(4445,448,'Clothing and Clothing Accessories Stores')
,(4445,4481,'Clothing Stores')
,(4445,4482,'Shoe Stores')
,(4445,4483,'Jewelry, Luggage, and Leather Goods Stores')
,(4445,449,'Furniture, Home Furnishings, Electronics, and Appliance Retailers')
,(4445,4491,'Furniture and Home Furnishings Retailers')
,(4445,4492,'Electronics and Appliance Retailers')
,(4445,451,'Sporting Goods, Hobby, Musical Instrument, and Book Stores')
,(4445,4511,'Sporting Goods, Hobby, and Musical Instrument Stores')
,(4445,4512,'Book Stores and News Dealers')
,(4445,452,'General Merchandise Stores')
,(4445,4522,'Department Stores')
,(4445,4523,'General Merchandise Stores, including Warehouse Clubs and Supercenters')
,(4445,453,'Miscellaneous Store Retailers')
,(4445,4531,'Florists')
,(4445,4532,'Office Supplies, Stationery, and Gift Stores')
,(4445,4533,'Used Merchandise Stores')
,(4445,4539,'Other Miscellaneous Store Retailers')
,(4445,454,'Nonstore Retailers')
,(4445,4541,'Electronic Shopping and Mail-Order Houses')
,(4445,4542,'Vending Machine Operators')
,(4445,4543,'Direct Selling Establishments')
,(4445,455,'General Merchandise Retailers')
,(4445,4551,'Department Stores')
,(4445,4552,'Warehouse Clubs, Supercenters, and Other General Merchandise Retailers')
,(4445,456,'Health and Personal Care Retailers')
,(4445,4561,'Health and Personal Care Retailers')
,(4445,457,'Gasoline Stations and Fuel Dealers')
,(4445,4571,'Gasoline Stations')
,(4445,458,'Clothing, Clothing Accessories, Shoe, and Jewelry Retailers')
,(4445,4581,'Clothing and Clothing Accessories Retailers')
,(4445,459,'Sporting Goods, Hobby, Musical Instrument, Book, and Miscellaneous Retailers')
,(4445,4591,'Sporting Goods, Hobby, and Musical Instrument Retailers')
,(4445,481,'Air Transportation')
,(4445,4811,'Scheduled Air Transportation')
,(4445,4812,'Nonscheduled Air Transportation')
,(4445,482,'Rail Transportation')
,(4445,4821,'Rail Transportation')
,(4445,483,'Water Transportation')
,(4445,4831,'Deep Sea, Coastal, and Great Lakes Water Transportation')
,(4445,4832,'Inland Water Transportation')
,(4445,484,'Truck Transportation')
,(4445,4841,'General Freight Trucking')
,(4445,4842,'Specialized Freight Trucking')
,(4445,485,'Transit and Ground Passenger Transportation')
,(4445,4851,'Urban Transit Systems')
,(4445,4852,'Interurban and Rural Bus Transportation')
,(4445,4853,'Taxi and Limousine Service')
,(4445,4854,'School and Employee Bus Transportation')
,(4445,4855,'Charter Bus Industry')
,(4445,4859,'Other Transit and Ground Passenger Transportation')
,(4445,486,'Pipeline Transportation')
,(4445,4861,'Pipeline Transportation of Crude Oil')
,(4445,4862,'Pipeline Transportation of Natural Gas')
,(4445,4869,'Other Pipeline Transportation')
,(4445,487,'Scenic and Sightseeing Transportation')
,(4445,4871,'Scenic and Sightseeing Transportation, Land')
,(4445,4872,'Scenic and Sightseeing Transportation, Water')
,(4445,4879,'Scenic and Sightseeing Transportation, Other')
,(4445,488,'Support Activities for Transportation')
,(4445,4881,'Support Activities for Air Transportation')
,(4445,4882,'Support Activities for Rail Transportation')
,(4445,4883,'Support Activities for Water Transportation')
,(4445,4884,'Support Activities for Road Transportation')
,(4445,4885,'Freight Transportation Arrangement')
,(4445,4889,'Other Support Activities for Transportation')
,(4445,491,'Postal Service')
,(4445,4911,'Postal Service')
,(4445,492,'Couriers and Messengers')
,(4445,4921,'Couriers and Express Delivery Services')
,(4445,4922,'Local Messengers and Local Delivery')
,(4445,493,'Warehousing and Storage')
,(4445,4931,'Warehousing and Storage')
,(51,511,'Publishing Industries (except Internet)')
,(51,5111,'Newspaper, Periodical, Book, and Directory Publishers')
,(51,5112,'Software Publishers')
,(51,512,'Motion Picture and Sound Recording Industries')
,(51,5121,'Motion Picture and Video Industries')
,(51,5122,'Sound Recording Industries')
,(51,513,'Publishing IndustriesT')
,(51,5131,'Newspaper, Periodical, Book, and Directory PublishersT')
,(51,5132,'Software PublishersT')
,(51,515,'Broadcasting (except Internet)')
,(51,5151,'Radio and Television Broadcasting')
,(51,5152,'Cable and Other Subscription Programming')
,(51,516,'Broadcasting and Content Providers')
,(51,5161,'Radio and Television Broadcasting Stations')
,(51,51612,'Television Broadcasting Stations')
,(51,517,'Telecommunications')
,(51,5171,'Wired and Wireless Telecommunications (except Satellite)')
,(51,5173,'Wired and Wireless Telecommunications Carriers')
,(51,5174,'Satellite Telecommunications')
,(51,5178,'All Other Telecommunications')
,(51,5179,'Other Telecommunications')
,(51,518,'Computing Infrastructure Providers, Data Processing, Web Hosting, and Related Services')
,(51,5182,'Computing Infrastructure Providers, Data Processing, Web Hosting, and Related Services')
,(51,519,'Web Search Portals, Libraries, Archives, and Other Information Services')
,(51,5191,'Other Information Services')
,(52,521,'Monetary Authorities-Central Bank')
,(52,5211,'Monetary Authorities-Central Bank')
,(52,522,'Credit Intermediation and Related Activities')
,(52,5221,'Depository Credit Intermediation')
,(52,5222,'Nondepository Credit Intermediation')
,(52,5223,'Activities Related to Credit Intermediation')
,(52,523,'Securities, Commodity Contracts, and Other Financial Investments and Related Activities')
,(52,5231,'Securities and Commodity Contracts Intermediation and Brokerage')
,(52,5232,'Securities and Commodity Exchanges')
,(52,5239,'Other Financial Investment Activities')
,(52,524,'Insurance Carriers and Related Activities')
,(52,5241,'Insurance Carriers')
,(52,5242,'Agencies, Brokerages, and Other Insurance Related Activities')
,(52,525,'Funds, Trusts, and Other Financial Vehicles')
,(52,5251,'Insurance and Employee Benefit Funds')
,(52,5259,'Other Investment Pools and Funds')
,(53,531,'Real Estate')
,(53,5311,'Lessors of Real Estate')
,(53,5312,'Offices of Real Estate Agents and Brokers')
,(53,5313,'Activities Related to Real Estate')
,(53,532,'Rental and Leasing Services')
,(53,5321,'Automotive Equipment Rental and Leasing')
,(53,5322,'Consumer Goods Rental')
,(53,5323,'General Rental Centers')
,(53,5324,'Commercial and Industrial Machinery and Equipment Rental and Leasing')
,(53,533,'Lessors of Nonfinancial Intangible Assets (except Copyrighted Works)')
,(53,5331,'Lessors of Nonfinancial Intangible Assets (except Copyrighted Works)')
,(54,541,'Professional, Scientific, and Technical Services')
,(54,5411,'Legal Services')
,(54,5412,'Accounting, Tax Preparation, Bookkeeping, and Payroll Services')
,(54,5413,'Architectural, Engineering, and Related Services')
,(54,5414,'Specialized Design Services')
,(54,5415,'Computer Systems Design and Related Services')
,(54,5416,'Management, Scientific, and Technical Consulting Services')
,(54,5417,'Scientific Research and Development Services')
,(54,5418,'Advertising, Public Relations, and Related Services')
,(54,5419,'Other Professional, Scientific, and Technical Services')
,(55,551,'Management of Companies and Enterprises')
,(55,5511,'Management of Companies and Enterprises')
,(56,561,'Administrative and Support Services')
,(56,5611,'Office Administrative Services')
,(56,5612,'Facilities Support Services')
,(56,5613,'Employment Services')
,(56,5614,'Business Support Services')
,(56,5615,'Travel Arrangement and Reservation Services')
,(56,5616,'Investigation and Security Services')
,(56,5617,'Services to Buildings and Dwellings')
,(56,5619,'Other Support Services')
,(56,562,'Waste Management and Remediation Services')
,(56,5621,'Waste Collection')
,(56,5622,'Waste Treatment and Disposal')
,(56,5629,'Remediation and Other Waste Management Services')
,(61,611,'Educational Services')
,(61,6111,'Elementary and Secondary Schools')
,(61,6112,'Junior Colleges')
,(61,6113,'Colleges, Universities, and Professional Schools')
,(61,6114,'Business Schools and Computer and Management Training')
,(61,6115,'Technical and Trade Schools')
,(61,6116,'Other Schools and Instruction')
,(61,6117,'Educational Support Services')
,(62,621,'Ambulatory Health Care Services')
,(62,6211,'Offices of Physicians')
,(62,6212,'Offices of Dentists')
,(62,6213,'Offices of Other Health Practitioners')
,(62,6214,'Outpatient Care Centers')
,(62,6215,'Medical and Diagnostic Laboratories')
,(62,6216,'Home Health Care Services')
,(62,6219,'Other Ambulatory Health Care Services')
,(62,622,'Hospitals')
,(62,6221,'General Medical and Surgical Hospitals')
,(62,6222,'Psychiatric and Substance Abuse Hospitals')
,(62,6223,'Specialty (except Psychiatric and Substance Abuse) Hospitals')
,(62,623,'Nursing and Residential Care Facilities')
,(62,6231,'Nursing Care Facilities (Skilled Nursing Facilities)')
,(62,6232,'Residential Intellectual and Developmental Disability, Mental Health, and Substance Abuse Facilities')
,(62,6233,'Continuing Care Retirement Communities and Assisted Living Facilities for the Elderly')
,(62,6239,'Other Residential Care Facilities')
,(62,624,'Social Assistance')
,(62,6241,'Individual and Family Services')
,(62,6242,'Community Food and Housing, and Emergency and Other Relief Services')
,(62,6243,'Vocational Rehabilitation Services')
,(62,6244,'Child Care Services')
,(71,711,'Performing Arts, Spectator Sports, and Related Industries')
,(71,7111,'Performing Arts Companies')
,(71,7112,'Spectator Sports')
,(71,7113,'Promoters of Performing Arts, Sports, and Similar Events')
,(71,7114,'Agents and Managers for Artists, Athletes, Entertainers, and Other Public Figures')
,(71,7115,'Independent Artists, Writers, and Performers')
,(71,712,'Museums, Historical Sites, and Similar Institutions')
,(71,7121,'Museums, Historical Sites, and Similar Institutions')
,(71,713,'Amusement, Gambling, and Recreation Industries')
,(71,7131,'Amusement Parks and Arcades')
,(71,7132,'Gambling Industries')
,(71,7139,'Other Amusement and Recreation Industries')
,(72,721,'Accommodation')
,(72,7211,'Traveler Accommodation')
,(72,7212,'RV (Recreational Vehicle) Parks and Recreational Camps')
,(72,7213,'Rooming and Boarding Houses, Dormitories, and Workers'' Camps')
,(72,722,'Food Services and Drinking Places')
,(72,7223,'Special Food Services')
,(72,7224,'Drinking Places (Alcoholic Beverages)')
,(72,7225,'Restaurants and Other Eating Places')
,(81,811,'Repair and Maintenance')
,(81,8111,'Automotive Repair and Maintenance')
,(81,8112,'Electronic and Precision Equipment Repair and Maintenance')
,(81,8113,'Commercial and Industrial Machinery and Equipment (except Automotive and Electronic) Repair and Maintenance')
,(81,8114,'Personal and Household Goods Repair and Maintenance')
,(81,812,'Personal and Laundry Services')
,(81,8121,'Personal Care Services')
,(81,8122,'Death Care Services')
,(81,8123,'Drycleaning and Laundry Services')
,(81,8129,'Other Personal Services')
,(81,813,'Religious, Grantmaking, Civic, Professional, and Similar Organizations')
,(81,8131,'Religious Organizations')
,(81,8132,'Grantmaking and Giving Services')
,(81,8133,'Social Advocacy Organizations')
,(81,8134,'Civic and Social Organizations')
,(81,8139,'Business, Professional, Labor, Political, and Similar Organizations')
,(81,814,'Private Households')
,(81,8141,'Private Households')
,(92,921,'Executive, Legislative, and Other General Government Support')
,(92,9211,'Executive, Legislative, and Other General Government Support')
,(92,922,'Justice, Public Order, and Safety Activities')
,(92,9221,'Justice, Public Order, and Safety Activities')
,(92,923,'Administration of Human Resource Programs')
,(92,9231,'Administration of Human Resource Programs')
,(92,924,'Administration of Environmental Quality Programs')
,(92,9241,'Administration of Environmental Quality Programs')
,(92,925,'Administration of Housing Programs, Urban Planning, and Community Development')
,(92,9251,'Administration of Housing Programs, Urban Planning, and Community Development')
,(92,926,'Administration of Economic Programs')
,(92,9261,'Administration of Economic Programs')
,(92,927,'Space Research and Technology')
,(92,9271,'Space Research and Technology')
,(92,928,'National Security and International Affairs')
,(92,9281,'National Security and International Affairs');`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
DELETE FROM business_sectors WHERE business_id= 11 AND id= 111;
DELETE FROM business_sectors WHERE business_id= 11 AND id= 1111;
DELETE FROM business_sectors WHERE business_id= 11 AND id= 1112;
DELETE FROM business_sectors WHERE business_id= 11 AND id= 1113;
DELETE FROM business_sectors WHERE business_id= 11 AND id= 1114;
DELETE FROM business_sectors WHERE business_id= 11 AND id= 1119;
DELETE FROM business_sectors WHERE business_id= 11 AND id= 112;
DELETE FROM business_sectors WHERE business_id= 11 AND id= 1121;
DELETE FROM business_sectors WHERE business_id= 11 AND id= 1122;
DELETE FROM business_sectors WHERE business_id= 11 AND id= 1123;
DELETE FROM business_sectors WHERE business_id= 11 AND id= 1124;
DELETE FROM business_sectors WHERE business_id= 11 AND id= 1125;
DELETE FROM business_sectors WHERE business_id= 11 AND id= 1129;
DELETE FROM business_sectors WHERE business_id= 11 AND id= 113;
DELETE FROM business_sectors WHERE business_id= 11 AND id= 1131;
DELETE FROM business_sectors WHERE business_id= 11 AND id= 1132;
DELETE FROM business_sectors WHERE business_id= 11 AND id= 1133;
DELETE FROM business_sectors WHERE business_id= 11 AND id= 114;
DELETE FROM business_sectors WHERE business_id= 11 AND id= 1141;
DELETE FROM business_sectors WHERE business_id= 11 AND id= 1142;
DELETE FROM business_sectors WHERE business_id= 11 AND id= 115;
DELETE FROM business_sectors WHERE business_id= 11 AND id= 1151;
DELETE FROM business_sectors WHERE business_id= 11 AND id= 1152;
DELETE FROM business_sectors WHERE business_id= 11 AND id= 1153;
DELETE FROM business_sectors WHERE business_id= 21 AND id= 211;
DELETE FROM business_sectors WHERE business_id= 21 AND id= 2111;
DELETE FROM business_sectors WHERE business_id= 21 AND id= 212;
DELETE FROM business_sectors WHERE business_id= 21 AND id= 2121;
DELETE FROM business_sectors WHERE business_id= 21 AND id= 2122;
DELETE FROM business_sectors WHERE business_id= 21 AND id= 2123;
DELETE FROM business_sectors WHERE business_id= 21 AND id= 213;
DELETE FROM business_sectors WHERE business_id= 21 AND id= 2131;
DELETE FROM business_sectors WHERE business_id= 22 AND id= 221;
DELETE FROM business_sectors WHERE business_id= 22 AND id= 2211;
DELETE FROM business_sectors WHERE business_id= 22 AND id= 22111;
DELETE FROM business_sectors WHERE business_id= 22 AND id= 2212;
DELETE FROM business_sectors WHERE business_id= 22 AND id= 2213;
DELETE FROM business_sectors WHERE business_id= 23 AND id= 236;
DELETE FROM business_sectors WHERE business_id= 23 AND id= 2361;
DELETE FROM business_sectors WHERE business_id= 23 AND id= 2362;
DELETE FROM business_sectors WHERE business_id= 23 AND id= 237;
DELETE FROM business_sectors WHERE business_id= 23 AND id= 2371;
DELETE FROM business_sectors WHERE business_id= 23 AND id= 2372;
DELETE FROM business_sectors WHERE business_id= 23 AND id= 2373;
DELETE FROM business_sectors WHERE business_id= 23 AND id= 2379;
DELETE FROM business_sectors WHERE business_id= 23 AND id= 238;
DELETE FROM business_sectors WHERE business_id= 23 AND id= 2381;
DELETE FROM business_sectors WHERE business_id= 23 AND id= 2382;
DELETE FROM business_sectors WHERE business_id= 23 AND id= 2383;
DELETE FROM business_sectors WHERE business_id= 23 AND id= 2389;
DELETE FROM business_sectors WHERE business_id= 3133 AND id= 311;
DELETE FROM business_sectors WHERE business_id= 3133 AND id= 3111;
DELETE FROM business_sectors WHERE business_id= 3133 AND id= 3112;
DELETE FROM business_sectors WHERE business_id= 3133 AND id= 3113;
DELETE FROM business_sectors WHERE business_id= 3133 AND id= 3114;
DELETE FROM business_sectors WHERE business_id= 3133 AND id= 3115;
DELETE FROM business_sectors WHERE business_id= 3133 AND id= 3116;
DELETE FROM business_sectors WHERE business_id= 3133 AND id= 3117;
DELETE FROM business_sectors WHERE business_id= 3133 AND id= 3118;
DELETE FROM business_sectors WHERE business_id= 3133 AND id= 3119;
DELETE FROM business_sectors WHERE business_id= 3133 AND id= 312;
DELETE FROM business_sectors WHERE business_id= 3133 AND id= 3121;
DELETE FROM business_sectors WHERE business_id= 3133 AND id= 3122;
DELETE FROM business_sectors WHERE business_id= 3133 AND id= 313;
DELETE FROM business_sectors WHERE business_id= 3133 AND id= 3131;
DELETE FROM business_sectors WHERE business_id= 3133 AND id= 3132;
DELETE FROM business_sectors WHERE business_id= 3133 AND id= 3133;
DELETE FROM business_sectors WHERE business_id= 3133 AND id= 314;
DELETE FROM business_sectors WHERE business_id= 3133 AND id= 3141;
DELETE FROM business_sectors WHERE business_id= 3133 AND id= 3149;
DELETE FROM business_sectors WHERE business_id= 3133 AND id= 315;
DELETE FROM business_sectors WHERE business_id= 3133 AND id= 3151;
DELETE FROM business_sectors WHERE business_id= 3133 AND id= 3152;
DELETE FROM business_sectors WHERE business_id= 3133 AND id= 3159;
DELETE FROM business_sectors WHERE business_id= 3133 AND id= 316;
DELETE FROM business_sectors WHERE business_id= 3133 AND id= 3161;
DELETE FROM business_sectors WHERE business_id= 3133 AND id= 3162;
DELETE FROM business_sectors WHERE business_id= 3133 AND id= 3169;
DELETE FROM business_sectors WHERE business_id= 3133 AND id= 321;
DELETE FROM business_sectors WHERE business_id= 3133 AND id= 3211;
DELETE FROM business_sectors WHERE business_id= 3133 AND id= 3212;
DELETE FROM business_sectors WHERE business_id= 3133 AND id= 32191;
DELETE FROM business_sectors WHERE business_id= 3133 AND id= 3221;
DELETE FROM business_sectors WHERE business_id= 3133 AND id= 32211;
DELETE FROM business_sectors WHERE business_id= 3133 AND id= 3222;
DELETE FROM business_sectors WHERE business_id= 3133 AND id= 323;
DELETE FROM business_sectors WHERE business_id= 3133 AND id= 3231;
DELETE FROM business_sectors WHERE business_id= 3133 AND id= 324;
DELETE FROM business_sectors WHERE business_id= 3133 AND id= 3241;
DELETE FROM business_sectors WHERE business_id= 3133 AND id= 325;
DELETE FROM business_sectors WHERE business_id= 3133 AND id= 3251;
DELETE FROM business_sectors WHERE business_id= 3133 AND id= 3252;
DELETE FROM business_sectors WHERE business_id= 3133 AND id= 3253;
DELETE FROM business_sectors WHERE business_id= 3133 AND id= 3254;
DELETE FROM business_sectors WHERE business_id= 3133 AND id= 3255;
DELETE FROM business_sectors WHERE business_id= 3133 AND id= 3256;
DELETE FROM business_sectors WHERE business_id= 3133 AND id= 3259;
DELETE FROM business_sectors WHERE business_id= 3133 AND id= 326;
DELETE FROM business_sectors WHERE business_id= 3133 AND id= 3261;
DELETE FROM business_sectors WHERE business_id= 3133 AND id= 3262;
DELETE FROM business_sectors WHERE business_id= 3133 AND id= 327;
DELETE FROM business_sectors WHERE business_id= 3133 AND id= 3271;
DELETE FROM business_sectors WHERE business_id= 3133 AND id= 3272;
DELETE FROM business_sectors WHERE business_id= 3133 AND id= 3273;
DELETE FROM business_sectors WHERE business_id= 3133 AND id= 3274;
DELETE FROM business_sectors WHERE business_id= 3133 AND id= 3279;
DELETE FROM business_sectors WHERE business_id= 3133 AND id= 331;
DELETE FROM business_sectors WHERE business_id= 3133 AND id= 3311;
DELETE FROM business_sectors WHERE business_id= 3133 AND id= 3312;
DELETE FROM business_sectors WHERE business_id= 3133 AND id= 3313;
DELETE FROM business_sectors WHERE business_id= 3133 AND id= 3314;
DELETE FROM business_sectors WHERE business_id= 3133 AND id= 3315;
DELETE FROM business_sectors WHERE business_id= 3133 AND id= 332;
DELETE FROM business_sectors WHERE business_id= 3133 AND id= 3321;
DELETE FROM business_sectors WHERE business_id= 3133 AND id= 3322;
DELETE FROM business_sectors WHERE business_id= 3133 AND id= 3323;
DELETE FROM business_sectors WHERE business_id= 3133 AND id= 3324;
DELETE FROM business_sectors WHERE business_id= 3133 AND id= 3325;
DELETE FROM business_sectors WHERE business_id= 3133 AND id= 3326;
DELETE FROM business_sectors WHERE business_id= 3133 AND id= 3327;
DELETE FROM business_sectors WHERE business_id= 3133 AND id= 3328;
DELETE FROM business_sectors WHERE business_id= 3133 AND id= 3329;
DELETE FROM business_sectors WHERE business_id= 3133 AND id= 333;
DELETE FROM business_sectors WHERE business_id= 3133 AND id= 3331;
DELETE FROM business_sectors WHERE business_id= 3133 AND id= 3332;
DELETE FROM business_sectors WHERE business_id= 3133 AND id= 3333;
DELETE FROM business_sectors WHERE business_id= 3133 AND id= 3334;
DELETE FROM business_sectors WHERE business_id= 3133 AND id= 3335;
DELETE FROM business_sectors WHERE business_id= 3133 AND id= 3336;
DELETE FROM business_sectors WHERE business_id= 3133 AND id= 3339;
DELETE FROM business_sectors WHERE business_id= 3133 AND id= 334;
DELETE FROM business_sectors WHERE business_id= 3133 AND id= 3341;
DELETE FROM business_sectors WHERE business_id= 3133 AND id= 3342;
DELETE FROM business_sectors WHERE business_id= 3133 AND id= 3343;
DELETE FROM business_sectors WHERE business_id= 3133 AND id= 3344;
DELETE FROM business_sectors WHERE business_id= 3133 AND id= 3345;
DELETE FROM business_sectors WHERE business_id= 3133 AND id= 3346;
DELETE FROM business_sectors WHERE business_id= 3133 AND id= 335;
DELETE FROM business_sectors WHERE business_id= 3133 AND id= 3351;
DELETE FROM business_sectors WHERE business_id= 3133 AND id= 3352;
DELETE FROM business_sectors WHERE business_id= 3133 AND id= 3353;
DELETE FROM business_sectors WHERE business_id= 3133 AND id= 3359;
DELETE FROM business_sectors WHERE business_id= 3133 AND id= 336;
DELETE FROM business_sectors WHERE business_id= 3133 AND id= 3361;
DELETE FROM business_sectors WHERE business_id= 3133 AND id= 3362;
DELETE FROM business_sectors WHERE business_id= 3133 AND id= 3363;
DELETE FROM business_sectors WHERE business_id= 3133 AND id= 3364;
DELETE FROM business_sectors WHERE business_id= 3133 AND id= 3365;
DELETE FROM business_sectors WHERE business_id= 3133 AND id= 3366;
DELETE FROM business_sectors WHERE business_id= 3133 AND id= 3369;
DELETE FROM business_sectors WHERE business_id= 3133 AND id= 337;
DELETE FROM business_sectors WHERE business_id= 3133 AND id= 3371;
DELETE FROM business_sectors WHERE business_id= 3133 AND id= 3372;
DELETE FROM business_sectors WHERE business_id= 3133 AND id= 337215;
DELETE FROM business_sectors WHERE business_id= 3133 AND id= 339;
DELETE FROM business_sectors WHERE business_id= 3133 AND id= 3391;
DELETE FROM business_sectors WHERE business_id= 3133 AND id= 3399;
DELETE FROM business_sectors WHERE business_id= 42 AND id= 423;
DELETE FROM business_sectors WHERE business_id= 42 AND id= 4232;
DELETE FROM business_sectors WHERE business_id= 42 AND id= 4233;
DELETE FROM business_sectors WHERE business_id= 42 AND id= 4234;
DELETE FROM business_sectors WHERE business_id= 42 AND id= 4235;
DELETE FROM business_sectors WHERE business_id= 42 AND id= 4236;
DELETE FROM business_sectors WHERE business_id= 42 AND id= 4237;
DELETE FROM business_sectors WHERE business_id= 42 AND id= 4238;
DELETE FROM business_sectors WHERE business_id= 42 AND id= 4239;
DELETE FROM business_sectors WHERE business_id= 42 AND id= 424;
DELETE FROM business_sectors WHERE business_id= 42 AND id= 4241;
DELETE FROM business_sectors WHERE business_id= 42 AND id= 4242;
DELETE FROM business_sectors WHERE business_id= 42 AND id= 4243;
DELETE FROM business_sectors WHERE business_id= 42 AND id= 4244;
DELETE FROM business_sectors WHERE business_id= 42 AND id= 4245;
DELETE FROM business_sectors WHERE business_id= 42 AND id= 4246;
DELETE FROM business_sectors WHERE business_id= 42 AND id= 4247;
DELETE FROM business_sectors WHERE business_id= 42 AND id= 4248;
DELETE FROM business_sectors WHERE business_id= 42 AND id= 4249;
DELETE FROM business_sectors WHERE business_id= 42 AND id= 425;
DELETE FROM business_sectors WHERE business_id= 42 AND id= 4251;
DELETE FROM business_sectors WHERE business_id= 4445 AND id= 441;
DELETE FROM business_sectors WHERE business_id= 4445 AND id= 4411;
DELETE FROM business_sectors WHERE business_id= 4445 AND id= 4412;
DELETE FROM business_sectors WHERE business_id= 4445 AND id= 4413;
DELETE FROM business_sectors WHERE business_id= 4445 AND id= 442;
DELETE FROM business_sectors WHERE business_id= 4445 AND id= 4421;
DELETE FROM business_sectors WHERE business_id= 4445 AND id= 4422;
DELETE FROM business_sectors WHERE business_id= 4445 AND id= 443;
DELETE FROM business_sectors WHERE business_id= 4445 AND id= 4431;
DELETE FROM business_sectors WHERE business_id= 4445 AND id= 444;
DELETE FROM business_sectors WHERE business_id= 4445 AND id= 4441;
DELETE FROM business_sectors WHERE business_id= 4445 AND id= 4442;
DELETE FROM business_sectors WHERE business_id= 4445 AND id= 445;
DELETE FROM business_sectors WHERE business_id= 4445 AND id= 4451;
DELETE FROM business_sectors WHERE business_id= 4445 AND id= 4452;
DELETE FROM business_sectors WHERE business_id= 4445 AND id= 4453;
DELETE FROM business_sectors WHERE business_id= 4445 AND id= 446;
DELETE FROM business_sectors WHERE business_id= 4445 AND id= 4461;
DELETE FROM business_sectors WHERE business_id= 4445 AND id= 447;
DELETE FROM business_sectors WHERE business_id= 4445 AND id= 4471;
DELETE FROM business_sectors WHERE business_id= 4445 AND id= 448;
DELETE FROM business_sectors WHERE business_id= 4445 AND id= 4481;
DELETE FROM business_sectors WHERE business_id= 4445 AND id= 4482;
DELETE FROM business_sectors WHERE business_id= 4445 AND id= 4483;
DELETE FROM business_sectors WHERE business_id= 4445 AND id= 449;
DELETE FROM business_sectors WHERE business_id= 4445 AND id= 4491;
DELETE FROM business_sectors WHERE business_id= 4445 AND id= 4492;
DELETE FROM business_sectors WHERE business_id= 4445 AND id= 451;
DELETE FROM business_sectors WHERE business_id= 4445 AND id= 4511;
DELETE FROM business_sectors WHERE business_id= 4445 AND id= 4512;
DELETE FROM business_sectors WHERE business_id= 4445 AND id= 452;
DELETE FROM business_sectors WHERE business_id= 4445 AND id= 4522;
DELETE FROM business_sectors WHERE business_id= 4445 AND id= 4523;
DELETE FROM business_sectors WHERE business_id= 4445 AND id= 453;
DELETE FROM business_sectors WHERE business_id= 4445 AND id= 4531;
DELETE FROM business_sectors WHERE business_id= 4445 AND id= 4532;
DELETE FROM business_sectors WHERE business_id= 4445 AND id= 4533;
DELETE FROM business_sectors WHERE business_id= 4445 AND id= 4539;
DELETE FROM business_sectors WHERE business_id= 4445 AND id= 454;
DELETE FROM business_sectors WHERE business_id= 4445 AND id= 4541;
DELETE FROM business_sectors WHERE business_id= 4445 AND id= 4542;
DELETE FROM business_sectors WHERE business_id= 4445 AND id= 4543;
DELETE FROM business_sectors WHERE business_id= 4445 AND id= 455;
DELETE FROM business_sectors WHERE business_id= 4445 AND id= 4551;
DELETE FROM business_sectors WHERE business_id= 4445 AND id= 4552;
DELETE FROM business_sectors WHERE business_id= 4445 AND id= 456;
DELETE FROM business_sectors WHERE business_id= 4445 AND id= 4561;
DELETE FROM business_sectors WHERE business_id= 4445 AND id= 457;
DELETE FROM business_sectors WHERE business_id= 4445 AND id= 4571;
DELETE FROM business_sectors WHERE business_id= 4445 AND id= 458;
DELETE FROM business_sectors WHERE business_id= 4445 AND id= 4581;
DELETE FROM business_sectors WHERE business_id= 4445 AND id= 459;
DELETE FROM business_sectors WHERE business_id= 4445 AND id= 4591;
DELETE FROM business_sectors WHERE business_id= 4445 AND id= 481;
DELETE FROM business_sectors WHERE business_id= 4445 AND id= 4811;
DELETE FROM business_sectors WHERE business_id= 4445 AND id= 4812;
DELETE FROM business_sectors WHERE business_id= 4445 AND id= 482;
DELETE FROM business_sectors WHERE business_id= 4445 AND id= 4821;
DELETE FROM business_sectors WHERE business_id= 4445 AND id= 483;
DELETE FROM business_sectors WHERE business_id= 4445 AND id= 4831;
DELETE FROM business_sectors WHERE business_id= 4445 AND id= 4832;
DELETE FROM business_sectors WHERE business_id= 4445 AND id= 484;
DELETE FROM business_sectors WHERE business_id= 4445 AND id= 4841;
DELETE FROM business_sectors WHERE business_id= 4445 AND id= 4842;
DELETE FROM business_sectors WHERE business_id= 4445 AND id= 485;
DELETE FROM business_sectors WHERE business_id= 4445 AND id= 4851;
DELETE FROM business_sectors WHERE business_id= 4445 AND id= 4852;
DELETE FROM business_sectors WHERE business_id= 4445 AND id= 4853;
DELETE FROM business_sectors WHERE business_id= 4445 AND id= 4854;
DELETE FROM business_sectors WHERE business_id= 4445 AND id= 4855;
DELETE FROM business_sectors WHERE business_id= 4445 AND id= 4859;
DELETE FROM business_sectors WHERE business_id= 4445 AND id= 486;
DELETE FROM business_sectors WHERE business_id= 4445 AND id= 4861;
DELETE FROM business_sectors WHERE business_id= 4445 AND id= 4862;
DELETE FROM business_sectors WHERE business_id= 4445 AND id= 4869;
DELETE FROM business_sectors WHERE business_id= 4445 AND id= 487;
DELETE FROM business_sectors WHERE business_id= 4445 AND id= 4871;
DELETE FROM business_sectors WHERE business_id= 4445 AND id= 4872;
DELETE FROM business_sectors WHERE business_id= 4445 AND id= 4879;
DELETE FROM business_sectors WHERE business_id= 4445 AND id= 488;
DELETE FROM business_sectors WHERE business_id= 4445 AND id= 4881;
DELETE FROM business_sectors WHERE business_id= 4445 AND id= 4882;
DELETE FROM business_sectors WHERE business_id= 4445 AND id= 4883;
DELETE FROM business_sectors WHERE business_id= 4445 AND id= 4884;
DELETE FROM business_sectors WHERE business_id= 4445 AND id= 4885;
DELETE FROM business_sectors WHERE business_id= 4445 AND id= 4889;
DELETE FROM business_sectors WHERE business_id= 4445 AND id= 491;
DELETE FROM business_sectors WHERE business_id= 4445 AND id= 4911;
DELETE FROM business_sectors WHERE business_id= 4445 AND id= 492;
DELETE FROM business_sectors WHERE business_id= 4445 AND id= 4921;
DELETE FROM business_sectors WHERE business_id= 4445 AND id= 4922;
DELETE FROM business_sectors WHERE business_id= 4445 AND id= 493;
DELETE FROM business_sectors WHERE business_id= 4445 AND id= 4931;
DELETE FROM business_sectors WHERE business_id= 51 AND id= 511;
DELETE FROM business_sectors WHERE business_id= 51 AND id= 5111;
DELETE FROM business_sectors WHERE business_id= 51 AND id= 5112;
DELETE FROM business_sectors WHERE business_id= 51 AND id= 512;
DELETE FROM business_sectors WHERE business_id= 51 AND id= 5121;
DELETE FROM business_sectors WHERE business_id= 51 AND id= 5122;
DELETE FROM business_sectors WHERE business_id= 51 AND id= 513;
DELETE FROM business_sectors WHERE business_id= 51 AND id= 5131;
DELETE FROM business_sectors WHERE business_id= 51 AND id= 5132;
DELETE FROM business_sectors WHERE business_id= 51 AND id= 515;
DELETE FROM business_sectors WHERE business_id= 51 AND id= 5151;
DELETE FROM business_sectors WHERE business_id= 51 AND id= 5152;
DELETE FROM business_sectors WHERE business_id= 51 AND id= 516;
DELETE FROM business_sectors WHERE business_id= 51 AND id= 5161;
DELETE FROM business_sectors WHERE business_id= 51 AND id= 51612;
DELETE FROM business_sectors WHERE business_id= 51 AND id= 517;
DELETE FROM business_sectors WHERE business_id= 51 AND id= 5171;
DELETE FROM business_sectors WHERE business_id= 51 AND id= 5173;
DELETE FROM business_sectors WHERE business_id= 51 AND id= 5174;
DELETE FROM business_sectors WHERE business_id= 51 AND id= 5178;
DELETE FROM business_sectors WHERE business_id= 51 AND id= 5179;
DELETE FROM business_sectors WHERE business_id= 51 AND id= 518;
DELETE FROM business_sectors WHERE business_id= 51 AND id= 5182;
DELETE FROM business_sectors WHERE business_id= 51 AND id= 519;
DELETE FROM business_sectors WHERE business_id= 51 AND id= 5191;
DELETE FROM business_sectors WHERE business_id= 52 AND id= 521;
DELETE FROM business_sectors WHERE business_id= 52 AND id= 5211;
DELETE FROM business_sectors WHERE business_id= 52 AND id= 522;
DELETE FROM business_sectors WHERE business_id= 52 AND id= 5221;
DELETE FROM business_sectors WHERE business_id= 52 AND id= 5222;
DELETE FROM business_sectors WHERE business_id= 52 AND id= 5223;
DELETE FROM business_sectors WHERE business_id= 52 AND id= 523;
DELETE FROM business_sectors WHERE business_id= 52 AND id= 5231;
DELETE FROM business_sectors WHERE business_id= 52 AND id= 5232;
DELETE FROM business_sectors WHERE business_id= 52 AND id= 5239;
DELETE FROM business_sectors WHERE business_id= 52 AND id= 524;
DELETE FROM business_sectors WHERE business_id= 52 AND id= 5241;
DELETE FROM business_sectors WHERE business_id= 52 AND id= 5242;
DELETE FROM business_sectors WHERE business_id= 52 AND id= 525;
DELETE FROM business_sectors WHERE business_id= 52 AND id= 5251;
DELETE FROM business_sectors WHERE business_id= 52 AND id= 5259;
DELETE FROM business_sectors WHERE business_id= 53 AND id= 531;
DELETE FROM business_sectors WHERE business_id= 53 AND id= 5311;
DELETE FROM business_sectors WHERE business_id= 53 AND id= 5312;
DELETE FROM business_sectors WHERE business_id= 53 AND id= 5313;
DELETE FROM business_sectors WHERE business_id= 53 AND id= 532;
DELETE FROM business_sectors WHERE business_id= 53 AND id= 5321;
DELETE FROM business_sectors WHERE business_id= 53 AND id= 5322;
DELETE FROM business_sectors WHERE business_id= 53 AND id= 5323;
DELETE FROM business_sectors WHERE business_id= 53 AND id= 5324;
DELETE FROM business_sectors WHERE business_id= 53 AND id= 533;
DELETE FROM business_sectors WHERE business_id= 53 AND id= 5331;
DELETE FROM business_sectors WHERE business_id= 54 AND id= 541;
DELETE FROM business_sectors WHERE business_id= 54 AND id= 5411;
DELETE FROM business_sectors WHERE business_id= 54 AND id= 5412;
DELETE FROM business_sectors WHERE business_id= 54 AND id= 5413;
DELETE FROM business_sectors WHERE business_id= 54 AND id= 5414;
DELETE FROM business_sectors WHERE business_id= 54 AND id= 5415;
DELETE FROM business_sectors WHERE business_id= 54 AND id= 5416;
DELETE FROM business_sectors WHERE business_id= 54 AND id= 5417;
DELETE FROM business_sectors WHERE business_id= 54 AND id= 5418;
DELETE FROM business_sectors WHERE business_id= 54 AND id= 5419;
DELETE FROM business_sectors WHERE business_id= 55 AND id= 551;
DELETE FROM business_sectors WHERE business_id= 55 AND id= 5511;
DELETE FROM business_sectors WHERE business_id= 56 AND id= 561;
DELETE FROM business_sectors WHERE business_id= 56 AND id= 5611;
DELETE FROM business_sectors WHERE business_id= 56 AND id= 5612;
DELETE FROM business_sectors WHERE business_id= 56 AND id= 5613;
DELETE FROM business_sectors WHERE business_id= 56 AND id= 5614;
DELETE FROM business_sectors WHERE business_id= 56 AND id= 5615;
DELETE FROM business_sectors WHERE business_id= 56 AND id= 5616;
DELETE FROM business_sectors WHERE business_id= 56 AND id= 5617;
DELETE FROM business_sectors WHERE business_id= 56 AND id= 5619;
DELETE FROM business_sectors WHERE business_id= 56 AND id= 562;
DELETE FROM business_sectors WHERE business_id= 56 AND id= 5621;
DELETE FROM business_sectors WHERE business_id= 56 AND id= 5622;
DELETE FROM business_sectors WHERE business_id= 56 AND id= 5629;
DELETE FROM business_sectors WHERE business_id= 61 AND id= 611;
DELETE FROM business_sectors WHERE business_id= 61 AND id= 6111;
DELETE FROM business_sectors WHERE business_id= 61 AND id= 6112;
DELETE FROM business_sectors WHERE business_id= 61 AND id= 6113;
DELETE FROM business_sectors WHERE business_id= 61 AND id= 6114;
DELETE FROM business_sectors WHERE business_id= 61 AND id= 6115;
DELETE FROM business_sectors WHERE business_id= 61 AND id= 6116;
DELETE FROM business_sectors WHERE business_id= 61 AND id= 6117;
DELETE FROM business_sectors WHERE business_id= 62 AND id= 621;
DELETE FROM business_sectors WHERE business_id= 62 AND id= 6211;
DELETE FROM business_sectors WHERE business_id= 62 AND id= 6212;
DELETE FROM business_sectors WHERE business_id= 62 AND id= 6213;
DELETE FROM business_sectors WHERE business_id= 62 AND id= 6214;
DELETE FROM business_sectors WHERE business_id= 62 AND id= 6215;
DELETE FROM business_sectors WHERE business_id= 62 AND id= 6216;
DELETE FROM business_sectors WHERE business_id= 62 AND id= 6219;
DELETE FROM business_sectors WHERE business_id= 62 AND id= 622;
DELETE FROM business_sectors WHERE business_id= 62 AND id= 6221;
DELETE FROM business_sectors WHERE business_id= 62 AND id= 6222;
DELETE FROM business_sectors WHERE business_id= 62 AND id= 6223;
DELETE FROM business_sectors WHERE business_id= 62 AND id= 623;
DELETE FROM business_sectors WHERE business_id= 62 AND id= 6231;
DELETE FROM business_sectors WHERE business_id= 62 AND id= 6232;
DELETE FROM business_sectors WHERE business_id= 62 AND id= 6233;
DELETE FROM business_sectors WHERE business_id= 62 AND id= 6239;
DELETE FROM business_sectors WHERE business_id= 62 AND id= 624;
DELETE FROM business_sectors WHERE business_id= 62 AND id= 6241;
DELETE FROM business_sectors WHERE business_id= 62 AND id= 6242;
DELETE FROM business_sectors WHERE business_id= 62 AND id= 6243;
DELETE FROM business_sectors WHERE business_id= 62 AND id= 6244;
DELETE FROM business_sectors WHERE business_id= 71 AND id= 711;
DELETE FROM business_sectors WHERE business_id= 71 AND id= 7111;
DELETE FROM business_sectors WHERE business_id= 71 AND id= 7112;
DELETE FROM business_sectors WHERE business_id= 71 AND id= 7113;
DELETE FROM business_sectors WHERE business_id= 71 AND id= 7114;
DELETE FROM business_sectors WHERE business_id= 71 AND id= 7115;
DELETE FROM business_sectors WHERE business_id= 71 AND id= 712;
DELETE FROM business_sectors WHERE business_id= 71 AND id= 7121;
DELETE FROM business_sectors WHERE business_id= 71 AND id= 713;
DELETE FROM business_sectors WHERE business_id= 71 AND id= 7131;
DELETE FROM business_sectors WHERE business_id= 71 AND id= 7132;
DELETE FROM business_sectors WHERE business_id= 71 AND id= 7139;
DELETE FROM business_sectors WHERE business_id= 72 AND id= 721;
DELETE FROM business_sectors WHERE business_id= 72 AND id= 7211;
DELETE FROM business_sectors WHERE business_id= 72 AND id= 7212;
DELETE FROM business_sectors WHERE business_id= 72 AND id= 7213;
DELETE FROM business_sectors WHERE business_id= 72 AND id= 722;
DELETE FROM business_sectors WHERE business_id= 72 AND id= 7223;
DELETE FROM business_sectors WHERE business_id= 72 AND id= 7224;
DELETE FROM business_sectors WHERE business_id= 72 AND id= 7225;
DELETE FROM business_sectors WHERE business_id= 81 AND id= 811;
DELETE FROM business_sectors WHERE business_id= 81 AND id= 8111;
DELETE FROM business_sectors WHERE business_id= 81 AND id= 8112;
DELETE FROM business_sectors WHERE business_id= 81 AND id= 8113;
DELETE FROM business_sectors WHERE business_id= 81 AND id= 8114;
DELETE FROM business_sectors WHERE business_id= 81 AND id= 812;
DELETE FROM business_sectors WHERE business_id= 81 AND id= 8121;
DELETE FROM business_sectors WHERE business_id= 81 AND id= 8122;
DELETE FROM business_sectors WHERE business_id= 81 AND id= 8123;
DELETE FROM business_sectors WHERE business_id= 81 AND id= 8129;
DELETE FROM business_sectors WHERE business_id= 81 AND id= 813;
DELETE FROM business_sectors WHERE business_id= 81 AND id= 8131;
DELETE FROM business_sectors WHERE business_id= 81 AND id= 8132;
DELETE FROM business_sectors WHERE business_id= 81 AND id= 8133;
DELETE FROM business_sectors WHERE business_id= 81 AND id= 8134;
DELETE FROM business_sectors WHERE business_id= 81 AND id= 8139;
DELETE FROM business_sectors WHERE business_id= 81 AND id= 814;
DELETE FROM business_sectors WHERE business_id= 81 AND id= 8141;
DELETE FROM business_sectors WHERE business_id= 92 AND id= 921;
DELETE FROM business_sectors WHERE business_id= 92 AND id= 9211;
DELETE FROM business_sectors WHERE business_id= 92 AND id= 922;
DELETE FROM business_sectors WHERE business_id= 92 AND id= 9221;
DELETE FROM business_sectors WHERE business_id= 92 AND id= 923;
DELETE FROM business_sectors WHERE business_id= 92 AND id= 9231;
DELETE FROM business_sectors WHERE business_id= 92 AND id= 924;
DELETE FROM business_sectors WHERE business_id= 92 AND id= 9241;
DELETE FROM business_sectors WHERE business_id= 92 AND id= 925;
DELETE FROM business_sectors WHERE business_id= 92 AND id= 9251;
DELETE FROM business_sectors WHERE business_id= 92 AND id= 926;
DELETE FROM business_sectors WHERE business_id= 92 AND id= 9261;
DELETE FROM business_sectors WHERE business_id= 92 AND id= 927;
DELETE FROM business_sectors WHERE business_id= 92 AND id= 9271;
DELETE FROM business_sectors WHERE business_id= 92 AND id= 928;
DELETE FROM business_sectors WHERE business_id= 92 AND id= 9281;`);
  }
}
