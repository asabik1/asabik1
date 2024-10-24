import { MigrationInterface, QueryRunner } from 'typeorm';

export class insertBuisnessSubSectors1677196875285
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        INSERT INTO business_subsectors(sector_id,id,name, forbidden) VALUES
        (1111,11111,'Soybean Farming','false')
       ,(1111,111110,'Soybean Farming','false')
       ,(1111,11112,'Oilseed (except Soybean) Farming','false')
       ,(1111,111120,'Oilseed (except Soybean) Farming','false')
       ,(1111,11113,'Dry Pea and Bean Farming','false')
       ,(1111,111130,'Dry Pea and Bean Farming','false')
       ,(1111,11114,'Wheat Farming','false')
       ,(1111,111140,'Wheat Farming','false')
       ,(1111,11115,'Corn Farming','false')
       ,(1111,111150,'Corn Farming','false')
       ,(1111,11116,'Rice Farming','false')
       ,(1111,111160,'Rice Farming','false')
       ,(1111,11119,'Other Grain Farming','false')
       ,(1111,111191,'Oilseed and Grain Combination Farming','false')
       ,(1111,111199,'All Other Grain Farming','false')
       ,(1112,11121,'Vegetable and Melon Farming','false')
       ,(1112,111211,'Potato Farming','false')
       ,(1112,111219,'Other Vegetable (except Potato) and Melon Farming','false')
       ,(1113,11131,'Orange Groves','false')
       ,(1113,111310,'Orange Groves','false')
       ,(1113,11132,'Citrus (except Orange) Groves','false')
       ,(1113,111320,'Citrus (except Orange) Groves','false')
       ,(1113,11133,'Noncitrus Fruit and Tree Nut Farming','false')
       ,(1113,111331,'Apple Orchards','false')
       ,(1113,111332,'Grape Vineyards','false')
       ,(1113,111333,'Strawberry Farming','false')
       ,(1113,111334,'Berry (except Strawberry) Farming','false')
       ,(1113,111335,'Tree Nut Farming','false')
       ,(1113,111336,'Fruit and Tree Nut Combination Farming','false')
       ,(1113,111339,'Other Noncitrus Fruit Farming','false')
       ,(1114,11141,'Food Crops Grown Under Cover','false')
       ,(1114,111411,'Mushroom Production','false')
       ,(1114,111419,'Other Food Crops Grown Under Cover','false')
       ,(1114,11142,'Nursery and Floriculture Production','false')
       ,(1114,111421,'Nursery and Tree Production','false')
       ,(1114,111422,'Floriculture Production','false')
       ,(1119,11191,'Tobacco Farming','true')
       ,(1119,111910,'Tobacco Farming','true')
       ,(1119,11192,'Cotton Farming','false')
       ,(1119,111920,'Cotton Farming','false')
       ,(1119,11193,'Sugarcane Farming','false')
       ,(1119,111930,'Sugarcane Farming','false')
       ,(1119,11194,'Hay Farming','false')
       ,(1119,111940,'Hay Farming','false')
       ,(1119,11199,'All Other Crop Farming','false')
       ,(1119,111991,'Sugar Beet Farming','false')
       ,(1119,111992,'Peanut Farming','false')
       ,(1119,111998,'All Other Miscellaneous Crop Farming','false')
       ,(1121,11211,'Beef Cattle Ranching and Farming, including Feedlots','false')
       ,(1121,112111,'Beef Cattle Ranching and Farming','false')
       ,(1121,112112,'Cattle Feedlots','false')
       ,(1121,11212,'Dairy Cattle and Milk Production','false')
       ,(1121,112120,'Dairy Cattle and Milk Production','false')
       ,(1121,11213,'Dual-Purpose Cattle Ranching and Farming','false')
       ,(1121,112130,'Dual-Purpose Cattle Ranching and Farming','false')
       ,(1122,11221,'Hog and Pig Farming','true')
       ,(1122,112210,'Hog and Pig Farming','true')
       ,(1123,11231,'Chicken Egg Production','false')
       ,(1123,112310,'Chicken Egg Production','false')
       ,(1123,11232,'Broilers and Other Meat Type Chicken Production','false')
       ,(1123,112320,'Broilers and Other Meat Type Chicken Production','false')
       ,(1123,11233,'Turkey Production','false')
       ,(1123,112330,'Turkey Production','false')
       ,(1123,11234,'Poultry Hatcheries','false')
       ,(1123,112340,'Poultry Hatcheries','false')
       ,(1123,11239,'Other Poultry Production','false')
       ,(1123,112390,'Other Poultry Production','false')
       ,(1124,11241,'Sheep Farming','false')
       ,(1124,112410,'Sheep Farming','false')
       ,(1124,11242,'Goat Farming','false')
       ,(1124,112420,'Goat Farming','false')
       ,(1125,11251,'Aquaculture','false')
       ,(1125,112511,'Finfish Farming and Fish Hatcheries','false')
       ,(1125,112512,'Shellfish Farming','false')
       ,(1125,112519,'Other Aquaculture','false')
       ,(1129,11291,'Apiculture','false')
       ,(1129,112910,'Apiculture','false')
       ,(1129,11292,'Horses and Other Equine Production','false')
       ,(1129,112920,'Horses and Other Equine Production','false')
       ,(1129,11293,'Fur-Bearing Animal and Rabbit Production','false')
       ,(1129,112930,'Fur-Bearing Animal and Rabbit Production','false')
       ,(1129,11299,'All Other Animal Production','false')
       ,(1129,112990,'All Other Animal Production','false')
       ,(1131,11311,'Timber Tract Operations','false')
       ,(1131,113110,'Timber Tract Operations','false')
       ,(1132,11321,'Forest Nurseries and Gathering of Forest Products','false')
       ,(1132,113210,'Forest Nurseries and Gathering of Forest Products','false')
       ,(1133,11331,'Logging','false')
       ,(1133,113310,'Logging','false')
       ,(1141,11411,'Fishing','false')
       ,(1141,114111,'Finfish Fishing','false')
       ,(1141,114112,'Shellfish Fishing','false')
       ,(1141,114119,'Other Marine Fishing','false')
       ,(1142,11421,'Hunting and Trapping','false')
       ,(1142,114210,'Hunting and Trapping','false')
       ,(1151,11511,'Support Activities for Crop Production','false')
       ,(1151,115111,'Cotton Ginning','false')
       ,(1151,115112,'Soil Preparation, Planting, and Cultivating','false')
       ,(1151,115113,'Crop Harvesting, Primarily by Machine','false')
       ,(1151,115114,'Postharvest Crop Activities (except Cotton Ginning)','false')
       ,(1151,115115,'Farm Labor Contractors and Crew Leaders','false')
       ,(1151,115116,'Farm Management Services','false')
       ,(1152,11521,'Support Activities for Animal Production','false')
       ,(1152,115210,'Support Activities for Animal Production','false')
       ,(1153,11531,'Support Activities for Forestry','false')
       ,(1153,115310,'Support Activities for Forestry','false')
       ,(2111,21112,'Crude Petroleum Extraction','false')
       ,(2111,211120,'Crude Petroleum Extraction','false')
       ,(2111,21113,'Natural Gas Extraction','false')
       ,(2111,211130,'Natural Gas Extraction','false')
       ,(2121,21211,'Coal Mining','false')
       ,(2121,212111,'Bituminous Coal and Lignite Surface Mining','false')
       ,(2121,212112,'Bituminous Coal Underground Mining bituminous coal','false')
       ,(2121,212113,'Anthracite Mining','false')
       ,(2121,212114,'Surface Coal Mining','false')
       ,(2121,212115,'Underground Coal Mining','false')
       ,(2122,21221,'Iron Ore Mining','false')
       ,(2122,212210,'Iron Ore Mining','false')
       ,(2122,21222,'Gold Ore and Silver Ore Mining','false')
       ,(2122,212220,'Gold Ore and Silver Ore Mining','false')
       ,(2122,212221,'Gold Ore Mining','false')
       ,(2122,212222,'Silver Ore Mining','false')
       ,(2122,21223,'Copper, Nickel, Lead, and Zinc Mining','false')
       ,(2122,212230,'Copper, Nickel, Lead, and Zinc Mining','false')
       ,(2122,21229,'Other Metal Ore Mining','false')
       ,(2122,212290,'Other Metal Ore Mining','false')
       ,(2122,212291,'Uranium-Radium-Vanadium Ore Mining','true')
       ,(2122,212299,'All Other Metal Ore Mining','false')
       ,(2123,21231,'Stone Mining and Quarrying','false')
       ,(2123,212311,'Dimension Stone Mining and Quarrying','false')
       ,(2123,212312,'Crushed and Broken Limestone Mining and Quarrying','false')
       ,(2123,212313,'Crushed and Broken Granite Mining and Quarrying','false')
       ,(2123,212319,'Other Crushed and Broken Stone Mining and Quarrying','false')
       ,(2123,21232,'Sand, Gravel, Clay, and Ceramic and Refractory Minerals Mining and Quarrying','false')
       ,(2123,212321,'Construction Sand and Gravel Mining','false')
       ,(2123,212322,'Industrial Sand Mining','false')
       ,(2123,212323,'Kaolin, Clay, and Ceramic and Refractory Minerals Mining','false')
       ,(2123,212324,'Kaolin and Ball Clay Mining','false')
       ,(2123,212325,'Clay and Ceramic and Refractory Minerals Mining','false')
       ,(2123,21239,'Other Nonmetallic Mineral Mining and Quarrying','false')
       ,(2123,212390,'Other Nonmetallic Mineral Mining and Quarrying','false')
       ,(2123,212391,'Potash, Soda, and Borate Mineral Mining','false')
       ,(2123,212392,'Phosphate Rock Mining','false')
       ,(2123,212393,'Other Chemical and Fertilizer Mineral Mining','false')
       ,(2123,212399,'All Other Nonmetallic Mineral Mining','false')
       ,(2131,21311,'Support Activities for Mining','false')
       ,(2131,213111,'Drilling Oil and Gas Wells','false')
       ,(2131,213112,'Support Activities for Oil and Gas Operations','false')
       ,(2131,213113,'Support Activities for Coal Mining','false')
       ,(2131,213114,'Support Activities for Metal Mining','false')
       ,(2131,213115,'Support Activities for Nonmetallic Minerals (except Fuels) Mining','false')
       ,(22111,22111,'Electric Power Generation','false')
       ,(22111,221111,'Hydroelectric Power Generation','false')
       ,(22111,221112,'Fossil Fuel Electric Power Generation','false')
       ,(22111,221113,'Nuclear Electric Power Generation','false')
       ,(22111,221114,'Solar Electric Power Generation','false')
       ,(22111,221115,'Wind Electric Power Generation','false')
       ,(22111,221116,'Geothermal Electric Power Generation','false')
       ,(22111,221117,'Biomass Electric Power Generation','false')
       ,(22111,221118,'Other Electric Power Generation','false')
       ,(22111,22112,'Electric Power Transmission, Control, and Distribution','false')
       ,(22111,221121,'Electric Bulk Power Transmission and Control','false')
       ,(22111,221122,'Electric Power Distribution','false')
       ,(2212,22121,'Natural Gas Distribution','false')
       ,(2212,221210,'Natural Gas Distribution','false')
       ,(2213,22131,'Water Supply and Irrigation Systems','false')
       ,(2213,221310,'Water Supply and Irrigation Systems','false')
       ,(2213,22132,'Sewage Treatment Facilities','false')
       ,(2213,221320,'Sewage Treatment Facilities','false')
       ,(2213,22133,'Steam and Air-Conditioning Supply','false')
       ,(2213,221330,'Steam and Air-Conditioning Supply','false')
       ,(2361,23611,'Residential Building Construction','false')
       ,(2361,236115,'New Single-Family Housing Construction (except For-Sale Builders)','false')
       ,(2361,236116,'New Multifamily Housing Construction (except For-Sale Builders)','false')
       ,(2361,236117,'New Housing For-Sale Builders','false')
       ,(2361,236118,'Residential Remodelers','false')
       ,(2362,23621,'Industrial Building Construction','false')
       ,(2362,236210,'Industrial Building Construction','false')
       ,(2362,23622,'Commercial and Institutional Building Construction','false')
       ,(2362,236220,'Commercial and Institutional Building Construction','false')
       ,(2371,23711,'Water and Sewer Line and Related Structures Construction','false')
       ,(2371,237110,'Water and Sewer Line and Related Structures Construction','false')
       ,(2371,23712,'Oil and Gas Pipeline and Related Structures Construction','false')
       ,(2371,237120,'Oil and Gas Pipeline and Related Structures Construction','false')
       ,(2371,23713,'Power and Communication Line and Related Structures Construction','false')
       ,(2371,237130,'Power and Communication Line and Related Structures Construction','false')
       ,(2372,23721,'Land Subdivision','false')
       ,(2372,237210,'Land Subdivision','false')
       ,(2373,23731,'Highway, Street, and Bridge Construction','false')
       ,(2373,237310,'Highway, Street, and Bridge Construction','false')
       ,(2379,23799,'Other Heavy and Civil Engineering Construction','false')
       ,(2379,237990,'Other Heavy and Civil Engineering Construction','false')
       ,(2381,23811,'Poured Concrete Foundation and Structure Contractors','false')
       ,(2381,238110,'Poured Concrete Foundation and Structure Contractors','false')
       ,(2381,23812,'Structural Steel and Precast Concrete Contractors','false')
       ,(2381,238120,'Structural Steel and Precast Concrete Contractors','false')
       ,(2381,23813,'Framing Contractors','false')
       ,(2381,238130,'Framing Contractors','false')
       ,(2381,23814,'Masonry Contractors','false')
       ,(2381,238140,'Masonry Contractors','false')
       ,(2381,23815,'Glass and Glazing Contractors','false')
       ,(2381,238150,'Glass and Glazing Contractors','false')
       ,(2381,23816,'Roofing Contractors','false')
       ,(2381,238160,'Roofing Contractors','false')
       ,(2381,23817,'Siding Contractors','false')
       ,(2381,238170,'Siding Contractors','false')
       ,(2381,23819,'Other Foundation, Structure, and Building Exterior Contractors','false')
       ,(2381,238190,'Other Foundation, Structure, and Building Exterior Contractors','false')
       ,(2382,23821,'Electrical Contractors and Other Wiring Installation Contractors','false')
       ,(2382,238210,'Electrical Contractors and Other Wiring Installation Contractors','false')
       ,(2382,23822,'Plumbing, Heating, and Air-Conditioning Contractors','false')
       ,(2382,238220,'Plumbing, Heating, and Air-Conditioning Contractors','false')
       ,(2382,23829,'Other Building Equipment Contractors','false')
       ,(2382,238290,'Other Building Equipment Contractors','false')
       ,(2383,23831,'Drywall and Insulation Contractors','false')
       ,(2383,238310,'Drywall and Insulation Contractors','false')
       ,(2383,23832,'Painting and Wall Covering Contractors','false')
       ,(2383,238320,'Painting and Wall Covering Contractors','false')
       ,(2383,23833,'Flooring Contractors','false')
       ,(2383,238330,'Flooring Contractors','false')
       ,(2383,23834,'Tile and Terrazzo Contractors','false')
       ,(2383,238340,'Tile and Terrazzo Contractors','false')
       ,(2383,23835,'Finish Carpentry Contractors','false')
       ,(2383,238350,'Finish Carpentry Contractors','false')
       ,(2383,23839,'Other Building Finishing Contractors','false')
       ,(2383,238390,'Other Building Finishing Contractors','false')
       ,(2389,23891,'Site Preparation Contractors','false')
       ,(2389,238910,'Site Preparation Contractors','false')
       ,(2389,23899,'All Other Specialty Trade Contractors','false')
       ,(2389,238990,'All Other Specialty Trade Contractors','false')
       ,(3111,31111,'Animal Food Manufacturing','false')
       ,(3111,311111,'Dog and Cat Food Manufacturing','false')
       ,(3111,311119,'Other Animal Food Manufacturing','false')
       ,(3112,31121,'Flour Milling and Malt Manufacturing','false')
       ,(3112,311211,'Flour Milling','false')
       ,(3112,311212,'Rice Milling','false')
       ,(3112,311213,'Malt Manufacturing','false')
       ,(3112,31122,'Starch and Vegetable Fats and Oils Manufacturing','false')
       ,(3112,311221,'Wet Corn Milling and Starch Manufacturing','false')
       ,(3112,311224,'Soybean and Other Oilseed Processing','false')
       ,(3112,311225,'Fats and Oils Refining and Blending','false')
       ,(3112,31123,'Breakfast Cereal Manufacturing','false')
       ,(3112,311230,'Breakfast Cereal Manufacturing','false')
       ,(3113,31131,'Sugar Manufacturing','false')
       ,(3113,311313,'Beet Sugar Manufacturing','false')
       ,(3113,311314,'Cane Sugar Manufacturing','false')
       ,(3113,31134,'Nonchocolate Confectionery Manufacturing','false')
       ,(3113,311340,'Nonchocolate Confectionery Manufacturing','false')
       ,(3113,31135,'Chocolate and Confectionery Manufacturing','false')
       ,(3113,311351,'Chocolate and Confectionery Manufacturing from Cacao Beans','false')
       ,(3113,311352,'Confectionery Manufacturing from Purchased Chocolate','false')
       ,(3114,31141,'Frozen Food Manufacturing','false')
       ,(3114,311411,'Frozen Fruit, Juice, and Vegetable Manufacturing','false')
       ,(3114,311412,'Frozen Specialty Food Manufacturing','false')
       ,(3114,31142,'Fruit and Vegetable Canning, Pickling, and Drying','false')
       ,(3114,311421,'Fruit and Vegetable Canning','false')
       ,(3114,311422,'Specialty Canning','false')
       ,(3114,311423,'Dried and Dehydrated Food Manufacturing','false')
       ,(3115,31151,'Dairy Product (except Frozen) Manufacturing','false')
       ,(3115,311511,'Fluid Milk Manufacturing','false')
       ,(3115,311512,'Creamery Butter Manufacturing','false')
       ,(3115,311513,'Cheese Manufacturing','false')
       ,(3115,311514,'Dry, Condensed, and Evaporated Dairy Product Manufacturing','true')
       ,(3115,31152,'Ice Cream and Frozen Dessert Manufacturing','false')
       ,(3115,311520,'Ice Cream and Frozen Dessert Manufacturing','false')
       ,(3116,31161,'Animal Slaughtering and Processing','false')
       ,(3116,311611,'Animal (except Poultry) Slaughtering','false')
       ,(3116,311612,'Meat Processed from Carcasses','false')
       ,(3116,311613,'Rendering and Meat Byproduct Processing','false')
       ,(3116,311615,'Poultry Processing','false')
       ,(3117,31171,'Seafood Product Preparation and Packaging','false')
       ,(3117,311710,'Seafood Product Preparation and Packaging','false')
       ,(3118,31181,'Bread and Bakery Product Manufacturing','false')
       ,(3118,311811,'Retail Bakeries','false')
       ,(3118,311812,'Commercial Bakeries','false')
       ,(3118,311813,'Frozen Cakes, Pies, and Other Pastries Manufacturing','false')
       ,(3118,31182,'Cookie, Cracker, and Pasta Manufacturing','false')
       ,(3118,311821,'Cookie and Cracker Manufacturing','false')
       ,(3118,311824,'Dry Pasta, Dough, and Flour Mixes Manufacturing from Purchased Flour','false')
       ,(3118,31183,'Tortilla Manufacturing','false')
       ,(3118,311830,'Tortilla Manufacturing','false')
       ,(3119,31191,'Snack Food Manufacturing','false')
       ,(3119,311911,'Roasted Nuts and Peanut Butter Manufacturing','false')
       ,(3119,311919,'Other Snack Food Manufacturing','false')
       ,(3119,31192,'Coffee and Tea Manufacturing','false')
       ,(3119,311920,'Coffee and Tea Manufacturing','false')
       ,(3119,31193,'Flavoring Syrup and Concentrate Manufacturing','false')
       ,(3119,311930,'Flavoring Syrup and Concentrate Manufacturing','false')
       ,(3119,31194,'Seasoning and Dressing Manufacturing','false')
       ,(3119,311941,'Mayonnaise, Dressing, and Other Prepared Sauce Manufacturing','false')
       ,(3119,311942,'Spice and Extract Manufacturing','false')
       ,(3119,31199,'All Other Food Manufacturing','false')
       ,(3119,311991,'Perishable Prepared Food Manufacturing','false')
       ,(3119,311999,'All Other Miscellaneous Food Manufacturing','false')
       ,(3121,31211,'Soft Drink and Ice Manufacturing','true')
       ,(3121,312111,'Soft Drink Manufacturing','true')
       ,(3121,312112,'Bottled Water Manufacturing','false')
       ,(3121,312113,'Ice Manufacturing','false')
       ,(3121,31212,'Breweries','true')
       ,(3121,312120,'Breweries','true')
       ,(3121,31213,'Wineries','true')
       ,(3121,312130,'Wineries','true')
       ,(3121,31214,'Distilleries','true')
       ,(3121,312140,'Distilleries','true')
       ,(3122,31223,'Tobacco Manufacturing','true')
       ,(3122,312230,'Tobacco Manufacturing','true')
       ,(3131,31311,'Fiber, Yarn, and Thread Mills','false')
       ,(3131,313110,'Fiber, Yarn, and Thread Mills','false')
       ,(3132,31321,'Broadwoven Fabric Mills','false')
       ,(3132,313210,'Broadwoven Fabric Mills','false')
       ,(3132,31322,'Narrow Fabric Mills and Schiffli Machine Embroidery','false')
       ,(3132,313220,'Narrow Fabric Mills and Schiffli Machine Embroidery','false')
       ,(3132,31323,'Nonwoven Fabric Mills','false')
       ,(3132,313230,'Nonwoven Fabric Mills','false')
       ,(3132,31324,'Knit Fabric Mills','false')
       ,(3132,313240,'Knit Fabric Mills','false')
       ,(3133,31331,'Textile and Fabric Finishing Mills','false')
       ,(3133,313310,'Textile and Fabric Finishing Mills','false')
       ,(3133,31332,'Fabric Coating Mills','false')
       ,(3133,313320,'Fabric Coating Mills','false')
       ,(3141,31411,'Carpet and Rug Mills','false')
       ,(3141,314110,'Carpet and Rug Mills','false')
       ,(3141,31412,'Curtain and Linen Mills','false')
       ,(3141,314120,'Curtain and Linen Mills','false')
       ,(3149,31491,'Textile Bag and Canvas Mills','false')
       ,(3149,314910,'Textile Bag and Canvas Mills','false')
       ,(3149,31499,'All Other Textile Product Mills','false')
       ,(3149,314994,'Rope, Cordage, Twine, Tire Cord, and Tire Fabric Mills','false')
       ,(3149,314999,'All Other Miscellaneous Textile Product Mills','false')
       ,(3151,31511,'Hosiery and Sock Mills','false')
       ,(3151,315110,'Hosiery and Sock Mills','false')
       ,(3151,31512,'Apparel Knitting MillsT','false')
       ,(3151,315120,'Apparel Knitting Mills','false')
       ,(3151,31519,'Other Apparel Knitting Mills','false')
       ,(3151,315190,'Other Apparel Knitting Mills','false')
       ,(3152,31521,'Cut and Sew Apparel Contractors','false')
       ,(3152,315210,'Cut and Sew Apparel Contractors','false')
       ,(3152,31525,'Cut and Sew Apparel Manufacturing (except Contractors)','false')
       ,(3152,315250,'Cut and Sew Apparel Manufacturing (except Contractors)','false')
       ,(3152,31522,'Men’s and Boys’ Cut and Sew Apparel Manufacturing','false')
       ,(3152,315220,'Men’s and Boys’ Cut and Sew Apparel Manufacturing','false')
       ,(3152,31524,'Women’s, Girls’, and Infants’ Cut and Sew Apparel Manufacturing','false')
       ,(3152,315240,'Women’s, Girls’, and Infants’ Cut and Sew Apparel Manufacturing','false')
       ,(3152,31528,'Other Cut and Sew Apparel Manufacturing','false')
       ,(3152,315280,'Other Cut and Sew Apparel Manufacturing','false')
       ,(3159,31599,'Apparel Accessories and Other Apparel Manufacturing','false')
       ,(3159,315990,'Apparel Accessories and Other Apparel Manufacturing','false')
       ,(3161,31611,'Leather and Hide Tanning and Finishing','false')
       ,(3161,316110,'Leather and Hide Tanning and Finishing','false')
       ,(3162,31621,'Footwear Manufacturing','false')
       ,(3162,316210,'Footwear Manufacturing','false')
       ,(3169,31699,'Other Leather and Allied Product Manufacturing','false')
       ,(3169,316990,'Other Leather and Allied Product Manufacturing','false')
       ,(3169,316992,'Women''s Handbag and Purse Manufacturing','false')
       ,(3169,316998,'All Other Leather Good and Allied Product Manufacturing','false')
       ,(3211,32111,'Sawmills and Wood Preservation','false')
       ,(3211,321113,'Sawmills','false')
       ,(3211,321114,'Wood Preservation','false')
       ,(3212,32121,'Veneer, Plywood, and Engineered Wood Product Manufacturing','false')
       ,(3212,321211,'Hardwood Veneer and Plywood Manufacturing','false')
       ,(3212,321212,'Softwood Veneer and Plywood Manufacturing','false')
       ,(3212,321213,'Engineered Wood Member (except Truss) Manufacturing','false')
       ,(3212,321214,'Truss Manufacturing','false')
       ,(3212,321215,'Engineered Wood Member Manufacturing','false')
       ,(3212,321219,'Reconstituted Wood Product Manufacturing','false')
       ,(3212,3219,'Other Wood Product Manufacturing','false')
       ,(32191,321911,'Wood Window and Door Manufacturing','false')
       ,(32191,321912,'Cut Stock, Resawing Lumber, and Planing','false')
       ,(32191,321918,'Other Millwork (including Flooring)','false')
       ,(32191,32192,'Wood Container and Pallet Manufacturing','false')
       ,(32191,321920,'Wood Container and Pallet Manufacturing','false')
       ,(32191,32199,'All Other Wood Product Manufacturing','false')
       ,(32191,321991,'Manufactured Home (Mobile Home) Manufacturing','false')
       ,(32191,321992,'Prefabricated Wood Building Manufacturing','false')
       ,(32191,321999,'All Other Miscellaneous Wood Product Manufacturing','false')
       ,(32191,322,'Paper Manufacturing','false')
       ,(32211,322110,'Pulp Mills','false')
       ,(32211,32212,'Paper Mills','false')
       ,(32211,322120,'Paper Mills','false')
       ,(32211,322121,'Paper (except Newsprint) Mills','false')
       ,(32211,322122,'Newsprint Mills','false')
       ,(32211,32213,'Paperboard Mills','false')
       ,(32211,322130,'Paperboard Mills','false')
       ,(3222,32221,'Paperboard Container Manufacturing','false')
       ,(3222,322211,'Corrugated and Solid Fiber Box Manufacturing','false')
       ,(3222,322212,'Folding Paperboard Box Manufacturing','false')
       ,(3222,322219,'Other Paperboard Container Manufacturing','false')
       ,(3222,32222,'Paper Bag and Coated and Treated Paper Manufacturing','false')
       ,(3222,322220,'Paper Bag and Coated and Treated Paper Manufacturing','false')
       ,(3222,32223,'Stationery Product Manufacturing','false')
       ,(3222,322230,'Stationery Product Manufacturing','false')
       ,(3222,32229,'Other Converted Paper Product Manufacturing','false')
       ,(3222,322291,'Sanitary Paper Product Manufacturing','false')
       ,(3222,322299,'All Other Converted Paper Product Manufacturing','false')
       ,(3231,32311,'Printing','false')
       ,(3231,323111,'Commercial Printing (except Screen and Books)','false')
       ,(3231,323113,'Commercial Screen Printing','false')
       ,(3231,323117,'Books Printing','false')
       ,(3231,32312,'Support Activities for Printing','false')
       ,(3231,323120,'Support Activities for Printing','false')
       ,(3241,32411,'Petroleum Refineries','false')
       ,(3241,324110,'Petroleum Refineries','false')
       ,(3241,32412,'Asphalt Paving, Roofing, and Saturated Materials Manufacturing','false')
       ,(3241,324121,'Asphalt Paving Mixture and Block Manufacturing','false')
       ,(3241,324122,'Asphalt Shingle and Coating Materials Manufacturing','false')
       ,(3241,32419,'Other Petroleum and Coal Products Manufacturing','false')
       ,(3241,324191,'Petroleum Lubricating Oil and Grease Manufacturing','false')
       ,(3241,324199,'All Other Petroleum and Coal Products Manufacturing','false')
       ,(3251,32511,'Petrochemical Manufacturing','false')
       ,(3251,325110,'Petrochemical Manufacturing','false')
       ,(3251,32512,'Industrial Gas Manufacturing','false')
       ,(3251,325120,'Industrial Gas Manufacturing','false')
       ,(3251,32513,'Synthetic Dye and Pigment Manufacturing','false')
       ,(3251,325130,'Synthetic Dye and Pigment Manufacturing','false')
       ,(3251,32518,'Other Basic Inorganic Chemical Manufacturing','false')
       ,(3251,325180,'Other Basic Inorganic Chemical Manufacturing','false')
       ,(3251,32519,'Other Basic Organic Chemical Manufacturing','false')
       ,(3251,325193,'Ethyl Alcohol Manufacturing','false')
       ,(3251,325194,'Cyclic Crude, Intermediate, and Gum and Wood Chemical Manufacturing','false')
       ,(3251,325199,'All Other Basic Organic Chemical Manufacturing','false')
       ,(3252,32521,'Resin and Synthetic Rubber Manufacturing','false')
       ,(3252,325211,'Plastics Material and Resin Manufacturing','true')
       ,(3252,325212,'Synthetic Rubber Manufacturing','false')
       ,(3252,32522,'Artificial and Synthetic Fibers and Filaments Manufacturing','false')
       ,(3252,325220,'Artificial and Synthetic Fibers and Filaments Manufacturing','false')
       ,(3253,32531,'Fertilizer and Compost Manufacturing','false')
       ,(3253,325311,'Nitrogenous Fertilizer Manufacturing','false')
       ,(3253,325312,'Phosphatic Fertilizer Manufacturing','false')
       ,(3253,325314,'Fertilizer (Mixing Only) Manufacturing','false')
       ,(3253,325315,'Compost Manufacturing','false')
       ,(3253,32532,'Pesticide and Other Agricultural Chemical Manufacturing','true')
       ,(3253,325320,'Pesticide and Other Agricultural Chemical Manufacturing','true')
       ,(3254,32541,'Pharmaceutical and Medicine Manufacturing','false')
       ,(3254,325411,'Medicinal and Botanical Manufacturing','false')
       ,(3254,325412,'Pharmaceutical Preparation Manufacturing','true')
       ,(3254,325413,'In-Vitro Diagnostic Substance Manufacturing','false')
       ,(3254,325414,'Biological Product (except Diagnostic) Manufacturing','false')
       ,(3255,32551,'Paint and Coating Manufacturing','false')
       ,(3255,325510,'Paint and Coating Manufacturing','false')
       ,(3255,32552,'Adhesive Manufacturing','false')
       ,(3255,325520,'Adhesive Manufacturing','false')
       ,(3256,32561,'Soap and Cleaning Compound Manufacturing','false')
       ,(3256,325611,'Soap and Other Detergent Manufacturing','false')
       ,(3256,325612,'Polish and Other Sanitation Good Manufacturing','false')
       ,(3256,325613,'Surface Active Agent Manufacturing','false')
       ,(3256,32562,'Toilet Preparation Manufacturing','false')
       ,(3256,325620,'Toilet Preparation Manufacturing','false')
       ,(3259,32591,'Printing Ink Manufacturing','false')
       ,(3259,325910,'Printing Ink Manufacturing','false')
       ,(3259,32592,'Explosives Manufacturing','true')
       ,(3259,325920,'Explosives Manufacturing','true')
       ,(3259,32599,'All Other Chemical Product and Preparation Manufacturing','false')
       ,(3259,325991,'Custom Compounding of Purchased Resins','false')
       ,(3259,325992,'Photographic Film, Paper, Plate, Chemical, and Copy Toner Manufacturing','false')
       ,(3259,325998,'All Other Miscellaneous Chemical Product and Preparation Manufacturing','false')
       ,(3261,32611,'Plastics Packaging Materials and Unlaminated Film and Sheet Manufacturing','true')
       ,(3261,326111,'Plastics Bag and Pouch Manufacturing','true')
       ,(3261,326112,'Plastics Packaging Film and Sheet (including Laminated) Manufacturing','true')
       ,(3261,326113,'Unlaminated Plastics Film and Sheet (except Packaging) Manufacturing','true')
       ,(3261,32612,'Plastics Pipe, Pipe Fitting, and Unlaminated Profile Shape Manufacturing','false')
       ,(3261,326121,'Unlaminated Plastics Profile Shape Manufacturing','true')
       ,(3261,326122,'Plastics Pipe and Pipe Fitting Manufacturing','false')
       ,(3261,32613,'Laminated Plastics Plate, Sheet (except Packaging), and Shape Manufacturing','true')
       ,(3261,326130,'Laminated Plastics Plate, Sheet (except Packaging), and Shape Manufacturing','true')
       ,(3261,32614,'Polystyrene Foam Product Manufacturing','true')
       ,(3261,326140,'Polystyrene Foam Product Manufacturing','true')
       ,(3261,32615,'Urethane and Other Foam Product (except Polystyrene) Manufacturing','true')
       ,(3261,326150,'Urethane and Other Foam Product (except Polystyrene) Manufacturing','true')
       ,(3261,32616,'Plastics Bottle Manufacturing','true')
       ,(3261,326160,'Plastics Bottle Manufacturing','true')
       ,(3261,32619,'Other Plastics Product Manufacturing','true')
       ,(3261,326191,'Plastics Plumbing Fixture Manufacturing','true')
       ,(3261,326199,'All Other Plastics Product Manufacturing','true')
       ,(3262,32621,'Tire Manufacturing','false')
       ,(3262,326211,'Tire Manufacturing (except Retreading)','false')
       ,(3262,326212,'Tire Retreading','false')
       ,(3262,32622,'Rubber and Plastics Hoses and Belting Manufacturing','false')
       ,(3262,326220,'Rubber and Plastics Hoses and Belting Manufacturing','false')
       ,(3262,32629,'Other Rubber Product Manufacturing','false')
       ,(3262,326291,'Rubber Product Manufacturing for Mechanical Use','false')
       ,(3262,326299,'All Other Rubber Product Manufacturing','false')
       ,(3271,32711,'Pottery, Ceramics, and Plumbing Fixture Manufacturing','false')
       ,(3271,327110,'Pottery, Ceramics, and Plumbing Fixture Manufacturing','false')
       ,(3271,32712,'Clay Building Material and Refractories Manufacturing','false')
       ,(3271,327120,'Clay Building Material and Refractories Manufacturing','false')
       ,(3272,32721,'Glass and Glass Product Manufacturing','false')
       ,(3272,327211,'Flat Glass Manufacturing','false')
       ,(3272,327212,'Other Pressed and Blown Glass and Glassware Manufacturing','false')
       ,(3272,327213,'Glass Container Manufacturing','false')
       ,(3272,327215,'Glass Product Manufacturing Made of Purchased Glass','false')
       ,(3273,32731,'Cement Manufacturing','false')
       ,(3273,327310,'Cement Manufacturing','false')
       ,(3273,32732,'Ready-Mix Concrete Manufacturing','false')
       ,(3273,327320,'Ready-Mix Concrete Manufacturing','false')
       ,(3273,32733,'Concrete Pipe, Brick, and Block Manufacturing','false')
       ,(3273,327331,'Concrete Block and Brick Manufacturing','false')
       ,(3273,327332,'Concrete Pipe Manufacturing','false')
       ,(3273,32739,'Other Concrete Product Manufacturing','false')
       ,(3273,327390,'Other Concrete Product Manufacturing','false')
       ,(3274,32741,'Lime Manufacturing','false')
       ,(3274,327410,'Lime Manufacturing','false')
       ,(3274,32742,'Gypsum Product Manufacturing','false')
       ,(3274,327420,'Gypsum Product Manufacturing','false')
       ,(3279,32791,'Abrasive Product Manufacturing','false')
       ,(3279,327910,'Abrasive Product Manufacturing','false')
       ,(3279,32799,'All Other Nonmetallic Mineral Product Manufacturing','false')
       ,(3279,327991,'Cut Stone and Stone Product Manufacturing','false')
       ,(3279,327992,'Ground or Treated Mineral and Earth Manufacturing','false')
       ,(3279,327993,'Mineral Wool Manufacturing','false')
       ,(3279,327999,'All Other Miscellaneous Nonmetallic Mineral Product Manufacturing','false')
       ,(3311,33111,'Iron and Steel Mills and Ferroalloy Manufacturing','false')
       ,(3311,331110,'Iron and Steel Mills and Ferroalloy Manufacturing','false')
       ,(3312,33121,'Iron and Steel Pipe and Tube Manufacturing from Purchased Steel','false')
       ,(3312,331210,'Iron and Steel Pipe and Tube Manufacturing from Purchased Steel','false')
       ,(3312,33122,'Rolling and Drawing of Purchased Steel','false')
       ,(3312,331221,'Rolled Steel Shape Manufacturing','false')
       ,(3312,331222,'Steel Wire Drawing','false')
       ,(3313,33131,'Alumina and Aluminum Production and Processing','false')
       ,(3313,331313,'Alumina Refining and Primary Aluminum Production','false')
       ,(3313,331314,'Secondary Smelting and Alloying of Aluminum','false')
       ,(3313,331315,'Aluminum Sheet, Plate, and Foil Manufacturing','false')
       ,(3313,331318,'Other Aluminum Rolling, Drawing, and Extruding','false')
       ,(3314,33141,'Nonferrous Metal (except Aluminum) Smelting and Refining','false')
       ,(3314,331410,'Nonferrous Metal (except Aluminum) Smelting and Refining','false')
       ,(3314,33142,'Copper Rolling, Drawing, Extruding, and Alloying','false')
       ,(3314,331420,'Copper Rolling, Drawing, Extruding, and Alloying','false')
       ,(3314,33149,'Nonferrous Metal (except Copper and Aluminum) Rolling, Drawing, Extruding, and Alloying','false')
       ,(3314,331491,'Nonferrous Metal (except Copper and Aluminum) Rolling, Drawing, and Extruding','false')
       ,(3314,331492,'Secondary Smelting, Refining, and Alloying of Nonferrous Metal (except Copper and Aluminum)','false')
       ,(3315,33151,'Ferrous Metal Foundries','false')
       ,(3315,331511,'Iron Foundries','false')
       ,(3315,331512,'Steel Investment Foundries','false')
       ,(3315,331513,'Steel Foundries (except Investment)','false')
       ,(3315,33152,'Nonferrous Metal Foundries','false')
       ,(3315,331523,'Nonferrous Metal Die-Casting Foundries','false')
       ,(3315,331524,'Aluminum Foundries (except Die-Casting)','false')
       ,(3315,331529,'Other Nonferrous Metal Foundries (except Die-Casting)','false')
       ,(3321,33211,'Forging and Stamping','false')
       ,(3321,332111,'Iron and Steel Forging','false')
       ,(3321,332112,'Nonferrous Forging','false')
       ,(3321,332114,'Custom Roll Forming','false')
       ,(3321,332117,'Powder Metallurgy Part Manufacturing','false')
       ,(3321,332119,'Metal Crown, Closure, and Other Metal Stamping (except Automotive)','false')
       ,(3322,33221,'Cutlery and Handtool Manufacturing','false')
       ,(3322,332215,'Metal Kitchen Cookware, Utensil, Cutlery, and Flatware (except Precious) Manufacturing','false')
       ,(3322,332216,'Saw Blade and Handtool Manufacturing','false')
       ,(3323,33231,'Plate Work and Fabricated Structural Product Manufacturing','false')
       ,(3323,332311,'Prefabricated Metal Building and Component Manufacturing','false')
       ,(3323,332312,'Fabricated Structural Metal Manufacturing','false')
       ,(3323,332313,'Plate Work Manufacturing','false')
       ,(3323,33232,'Ornamental and Architectural Metal Products Manufacturing','false')
       ,(3323,332321,'Metal Window and Door Manufacturing','false')
       ,(3323,332322,'Sheet Metal Work Manufacturing','false')
       ,(3323,332323,'Ornamental and Architectural Metal Work Manufacturing','false')
       ,(3324,33241,'Power Boiler and Heat Exchanger Manufacturing','false')
       ,(3324,332410,'Power Boiler and Heat Exchanger Manufacturing','false')
       ,(3324,33242,'Metal Tank (Heavy Gauge) Manufacturing','false')
       ,(3324,332420,'Metal Tank (Heavy Gauge) Manufacturing','false')
       ,(3324,33243,'Metal Can, Box, and Other Metal Container (Light Gauge) Manufacturing','false')
       ,(3324,332431,'Metal Can Manufacturing','false')
       ,(3324,332439,'Other Metal Container Manufacturing','false')
       ,(3325,33251,'Hardware Manufacturing','false')
       ,(3325,332510,'Hardware Manufacturing','false')
       ,(3326,33261,'Spring and Wire Product Manufacturing','false')
       ,(3326,332613,'Spring Manufacturing','false')
       ,(3326,332618,'Other Fabricated Wire Product Manufacturing','false')
       ,(3327,33271,'Machine Shops','false')
       ,(3327,332710,'Machine Shops','false')
       ,(3327,33272,'Turned Product and Screw, Nut, and Bolt Manufacturing','false')
       ,(3327,332721,'Precision Turned Product Manufacturing','false')
       ,(3327,332722,'Bolt, Nut, Screw, Rivet, and Washer Manufacturing','false')
       ,(3328,33281,'Coating, Engraving, Heat Treating, and Allied Activities','false')
       ,(3328,332811,'Metal Heat Treating','false')
       ,(3328,332812,'Metal Coating, Engraving (except Jewelry and Silverware), and Allied Services to Manufacturers','false')
       ,(3328,332813,'Electroplating, Plating, Polishing, Anodizing, and Coloring','false')
       ,(3329,33291,'Metal Valve Manufacturing','false')
       ,(3329,332911,'Industrial Valve Manufacturing','false')
       ,(3329,332912,'Fluid Power Valve and Hose Fitting Manufacturing','false')
       ,(3329,332913,'Plumbing Fixture Fitting and Trim Manufacturing','false')
       ,(3329,332919,'Other Metal Valve and Pipe Fitting Manufacturing','false')
       ,(3329,33299,'All Other Fabricated Metal Product Manufacturing','false')
       ,(3329,332991,'Ball and Roller Bearing Manufacturing','false')
       ,(3329,332992,'Small Arms Ammunition Manufacturing','true')
       ,(3329,332993,'Ammunition (except Small Arms) Manufacturing','true')
       ,(3329,332994,'Small Arms, Ordnance, and Ordnance Accessories Manufacturing','true')
       ,(3329,332996,'Fabricated Pipe and Pipe Fitting Manufacturing','false')
       ,(3329,332999,'All Other Miscellaneous Fabricated Metal Product Manufacturing','false')
       ,(3331,33311,'Agricultural Implement Manufacturing','false')
       ,(3331,333111,'Farm Machinery and Equipment Manufacturing','false')
       ,(3331,333112,'Lawn and Garden Tractor and Home Lawn and Garden Equipment Manufacturing','false')
       ,(3331,33312,'Construction Machinery Manufacturing','false')
       ,(3331,333120,'Construction Machinery Manufacturing','false')
       ,(3331,33313,'Mining and Oil and Gas Field Machinery Manufacturing','false')
       ,(3331,333131,'Mining Machinery and Equipment Manufacturing','false')
       ,(3331,333132,'Oil and Gas Field Machinery and Equipment Manufacturing','false')
       ,(3332,33324,'Industrial Machinery Manufacturing','false')
       ,(3332,333241,'Food Product Machinery Manufacturing','false')
       ,(3332,333242,'Semiconductor Machinery Manufacturing','false')
       ,(3332,333243,'Sawmill, Woodworking, and Paper Machinery Manufacturing','false')
       ,(3332,333244,'Printing Machinery and Equipment Manufacturing','false')
       ,(3332,333248,'All Other Industrial Machinery Manufacturing','false')
       ,(3332,333249,'Other Industrial Machinery Manufacturing','false')
       ,(3333,33331,'Commercial and Service Industry Machinery Manufacturing','false')
       ,(3333,333310,'Commercial and Service Industry Machinery Manufacturing','false')
       ,(3333,333314,'Optical Instrument and Lens Manufacturing','false')
       ,(3333,333316,'Photographic and Photocopying Equipment Manufacturing','false')
       ,(3333,333318,'Other Commercial and Service Industry Machinery Manufacturing','false')
       ,(3334,33341,'Ventilation, Heating, Air-Conditioning, and Commercial Refrigeration Equipment Manufacturing','false')
       ,(3334,333413,'Industrial and Commercial Fan and Blower and Air Purification Equipment Manufacturing','false')
       ,(3334,333414,'Heating Equipment (except Warm Air Furnaces) Manufacturing','false')
       ,(3334,333415,'Air-Conditioning and Warm Air Heating Equipment and Commercial and Industrial Refrigeration Equipment Manufacturing','false')
       ,(3335,33351,'Metalworking Machinery Manufacturing','false')
       ,(3335,333511,'Industrial Mold Manufacturing','false')
       ,(3335,333514,'Special Die and Tool, Die Set, Jig, and Fixture Manufacturing','false')
       ,(3335,333515,'Cutting Tool and Machine Tool Accessory Manufacturing','false')
       ,(3335,333517,'Machine Tool Manufacturing','false')
       ,(3335,333519,'Rolling Mill and Other Metalworking Machinery Manufacturing','false')
       ,(3336,33361,'Engine, Turbine, and Power Transmission Equipment Manufacturing','false')
       ,(3336,333611,'Turbine and Turbine Generator Set Units Manufacturing','false')
       ,(3336,333612,'Speed Changer, Industrial High-Speed Drive, and Gear Manufacturing','false')
       ,(3336,333613,'Mechanical Power Transmission Equipment Manufacturing','false')
       ,(3336,333618,'Other Engine Equipment Manufacturing','false')
       ,(3339,33391,'Pump and Compressor Manufacturing','false')
       ,(3339,333912,'Air and Gas Compressor Manufacturing','false')
       ,(3339,333914,'Measuring, Dispensing, and Other Pumping Equipment Manufacturing','false')
       ,(3339,33392,'Material Handling Equipment Manufacturing','false')
       ,(3339,333921,'Elevator and Moving Stairway Manufacturing','false')
       ,(3339,333922,'Conveyor and Conveying Equipment Manufacturing','false')
       ,(3339,333923,'Overhead Traveling Crane, Hoist, and Monorail System Manufacturing','false')
       ,(3339,333924,'Industrial Truck, Tractor, Trailer, and Stacker Machinery Manufacturing','false')
       ,(3339,33399,'All Other General Purpose Machinery Manufacturing','false')
       ,(3339,333991,'Power-Driven Handtool Manufacturing','false')
       ,(3339,333992,'Welding and Soldering Equipment Manufacturing','false')
       ,(3339,333993,'Packaging Machinery Manufacturing','false')
       ,(3339,333994,'Industrial Process Furnace and Oven Manufacturing','false')
       ,(3339,333995,'Fluid Power Cylinder and Actuator Manufacturing','false')
       ,(3339,333996,'Fluid Power Pump and Motor Manufacturing','false')
       ,(3339,333997,'Scale and Balance Manufacturing','false')
       ,(3339,333998,'All Other Miscellaneous General Purpose Machinery Manufacturing','false')
       ,(3341,33411,'Computer and Peripheral Equipment Manufacturing','false')
       ,(3341,334111,'Electronic Computer Manufacturing','false')
       ,(3341,334112,'Computer Storage Device Manufacturing','false')
       ,(3341,334118,'Computer Terminal and Other Computer Peripheral Equipment Manufacturing','false')
       ,(3342,33421,'Telephone Apparatus Manufacturing','false')
       ,(3342,334210,'Telephone Apparatus Manufacturing','false')
       ,(3342,33422,'Radio and Television Broadcasting and Wireless Communications Equipment Manufacturing','false')
       ,(3342,334220,'Radio and Television Broadcasting and Wireless Communications Equipment Manufacturing','false')
       ,(3342,33429,'Other Communications Equipment Manufacturing','false')
       ,(3342,334290,'Other Communications Equipment Manufacturing','false')
       ,(3343,33431,'Audio and Video Equipment Manufacturing','false')
       ,(3343,334310,'Audio and Video Equipment Manufacturing','false')
       ,(3344,33441,'Semiconductor and Other Electronic Component Manufacturing','false')
       ,(3344,334412,'Bare Printed Circuit Board Manufacturing','false')
       ,(3344,334413,'Semiconductor and Related Device Manufacturing','false')
       ,(3344,334416,'Capacitor, Resistor, Coil, Transformer, and Other Inductor Manufacturing','false')
       ,(3344,334417,'Electronic Connector Manufacturing','false')
       ,(3344,334418,'Printed Circuit Assembly (Electronic Assembly) Manufacturing','false')
       ,(3344,334419,'Other Electronic Component Manufacturing','false')
       ,(3345,33451,'Navigational, Measuring, Electromedical, and Control Instruments Manufacturing','false')
       ,(3345,334510,'Electromedical and Electrotherapeutic Apparatus Manufacturing','false')
       ,(3345,334511,'Search, Detection, Navigation, Guidance, Aeronautical, and Nautical System and Instrument Manufacturing','false')
       ,(3345,334512,'Automatic Environmental Control Manufacturing for Residential, Commercial, and Appliance Use','false')
       ,(3345,334513,'Instruments and Related Products Manufacturing for Measuring, Displaying, and Controlling Industrial Process Variables','false')
       ,(3345,334514,'Totalizing Fluid Meter and Counting Device Manufacturing','false')
       ,(3345,334515,'Instrument Manufacturing for Measuring and Testing Electricity and Electrical Signals','false')
       ,(3345,334516,'Analytical Laboratory Instrument Manufacturing','false')
       ,(3345,334517,'Irradiation Apparatus Manufacturing','false')
       ,(3345,334519,'Other Measuring and Controlling Device Manufacturing','false')
       ,(3346,33461,'Manufacturing and Reproducing Magnetic and Optical Media','false')
       ,(3346,334610,'Manufacturing and Reproducing Magnetic and Optical Media','false')
       ,(3346,334613,'Blank Magnetic and Optical Recording Media Manufacturing','false')
       ,(3346,334614,'Software and Other Prerecorded Compact Disc, Tape, and Record Reproducing','false')
       ,(335,33513,'Electric Lighting Equipment ManufacturingT','false')
       ,(335,335131,'Residential Electric Lighting Fixture Manufacturing','false')
       ,(335,335132,'Commercial, Industrial, and Institutional Electric Lighting Fixture Manufacturing','false')
       ,(335,335139,'Electric Lamp Bulb and Other Lighting Equipment Manufacturing','false')
       ,(3351,33511,'Electric Lamp Bulb and Part Manufacturing','false')
       ,(3351,335110,'Electric Lamp Bulb and Part Manufacturing','false')
       ,(3351,33512,'Lighting Fixture Manufacturing','false')
       ,(3351,335121,'Residential Electric Lighting Fixture Manufacturing','false')
       ,(3351,335122,'Commercial, Industrial, and Institutional Electric Lighting Fixture Manufacturing','false')
       ,(3351,335129,'Other Lighting Equipment Manufacturing','false')
       ,(3352,33521,'Small Electrical Appliance Manufacturing','false')
       ,(3352,335210,'Small Electrical Appliance Manufacturing','false')
       ,(3352,33522,'Major Household Appliance Manufacturing','false')
       ,(3352,335220,'Major Household Appliance Manufacturing','false')
       ,(3353,33531,'Electrical Equipment Manufacturing','false')
       ,(3353,335311,'Power, Distribution, and Specialty Transformer Manufacturing','false')
       ,(3353,335312,'Motor and Generator Manufacturing','false')
       ,(3353,335313,'Switchgear and Switchboard Apparatus Manufacturing','false')
       ,(3353,335314,'Relay and Industrial Control Manufacturing','false')
       ,(3359,33591,'Battery Manufacturing','false')
       ,(3359,335910,'Battery Manufacturing','false')
       ,(3359,335911,'Storage Battery Manufacturing','false')
       ,(3359,335912,'Primary Battery Manufacturing','false')
       ,(3359,33592,'Communication and Energy Wire and Cable Manufacturing','false')
       ,(3359,335921,'Fiber Optic Cable Manufacturing','false')
       ,(3359,335929,'Other Communication and Energy Wire Manufacturing','false')
       ,(3359,33593,'Wiring Device Manufacturing','false')
       ,(3359,335931,'Current-Carrying Wiring Device Manufacturing','false')
       ,(3359,335932,'Noncurrent-Carrying Wiring Device Manufacturing','false')
       ,(3359,33599,'All Other Electrical Equipment and Component Manufacturing','false')
       ,(3359,335991,'Carbon and Graphite Product Manufacturing','false')
       ,(3359,335999,'All Other Miscellaneous Electrical Equipment and Component Manufacturing','false')
       ,(3361,33611,'Automobile and Light Duty Motor Vehicle Manufacturing','false')
       ,(3361,336110,'Automobile and Light Duty Motor Vehicle Manufacturing','false')
       ,(3361,336111,'Automobile Manufacturing','false')
       ,(3361,336112,'Light Truck and Utility Vehicle Manufacturing','false')
       ,(3361,33612,'Heavy Duty Truck Manufacturing','false')
       ,(3361,336120,'Heavy Duty Truck Manufacturing','false')
       ,(3362,33621,'Motor Vehicle Body and Trailer Manufacturing','false')
       ,(3362,336211,'Motor Vehicle Body Manufacturing','false')
       ,(3362,336212,'Truck Trailer Manufacturing','false')
       ,(3362,336213,'Motor Home Manufacturing','false')
       ,(3362,336214,'Travel Trailer and Camper Manufacturing','false')
       ,(3363,33631,'Motor Vehicle Gasoline Engine and Engine Parts Manufacturing','false')
       ,(3363,336310,'Motor Vehicle Gasoline Engine and Engine Parts Manufacturing','false')
       ,(3363,33632,'Motor Vehicle Electrical and Electronic Equipment Manufacturing','false')
       ,(3363,336320,'Motor Vehicle Electrical and Electronic Equipment Manufacturing','false')
       ,(3363,33633,'Motor Vehicle Steering and Suspension Components (except Spring) Manufacturing','false')
       ,(3363,336330,'Motor Vehicle Steering and Suspension Components (except Spring) Manufacturing','false')
       ,(3363,33634,'Motor Vehicle Brake System Manufacturing','false')
       ,(3363,336340,'Motor Vehicle Brake System Manufacturing','false')
       ,(3363,33635,'Motor Vehicle Transmission and Power Train Parts Manufacturing','false')
       ,(3363,336350,'Motor Vehicle Transmission and Power Train Parts Manufacturing','false')
       ,(3363,33636,'Motor Vehicle Seating and Interior Trim Manufacturing','false')
       ,(3363,336360,'Motor Vehicle Seating and Interior Trim Manufacturing','false')
       ,(3363,33637,'Motor Vehicle Metal Stamping','false')
       ,(3363,336370,'Motor Vehicle Metal Stamping','false')
       ,(3363,33639,'Other Motor Vehicle Parts Manufacturing','false')
       ,(3363,336390,'Other Motor Vehicle Parts Manufacturing','false')
       ,(3364,33641,'Aerospace Product and Parts Manufacturing','false')
       ,(3364,336411,'Aircraft Manufacturing','false')
       ,(3364,336412,'Aircraft Engine and Engine Parts Manufacturing','false')
       ,(3364,336413,'Other Aircraft Parts and Auxiliary Equipment Manufacturing','false')
       ,(3364,336414,'Guided Missile and Space Vehicle Manufacturing','true')
       ,(3364,336415,'Guided Missile and Space Vehicle Propulsion Unit and Propulsion Unit Parts Manufacturing','true')
       ,(3364,336419,'Other Guided Missile and Space Vehicle Parts and Auxiliary Equipment Manufacturing','true')
       ,(3365,33651,'Railroad Rolling Stock Manufacturing','false')
       ,(3365,336510,'Railroad Rolling Stock Manufacturing','false')
       ,(3366,33661,'Ship and Boat Building','false')
       ,(3366,336611,'Ship Building and Repairing','false')
       ,(3366,336612,'Boat Building','false')
       ,(3369,33699,'Other Transportation Equipment Manufacturing','false')
       ,(3369,336991,'Motorcycle, Bicycle, and Parts Manufacturing','false')
       ,(3369,336992,'Military Armored Vehicle, Tank, and Tank Component Manufacturing','true')
       ,(3369,336999,'All Other Transportation Equipment Manufacturing','false')
       ,(3371,33711,'Wood Kitchen Cabinet and Countertop Manufacturing','false')
       ,(3371,337110,'Wood Kitchen Cabinet and Countertop Manufacturing','false')
       ,(3371,33712,'Household and Institutional Furniture Manufacturing','false')
       ,(3371,337121,'Upholstered Household Furniture Manufacturing','false')
       ,(3371,337122,'Nonupholstered Wood Household Furniture Manufacturing','false')
       ,(3371,337124,'Metal Household Furniture Manufacturing','false')
       ,(3371,337125,'Household Furniture (except Wood and Metal) Manufacturing','false')
       ,(3371,337126,'Household Furniture (except Wood and Upholstered) Manufacturing','false')
       ,(3371,337127,'Institutional Furniture Manufacturing','false')
       ,(3372,33721,'Office Furniture (including Fixtures) Manufacturing','false')
       ,(3372,337211,'Wood Office Furniture Manufacturing','false')
       ,(3372,337212,'Custom Architectural Woodwork and Millwork Manufacturing','false')
       ,(3372,337214,'Office Furniture (except Wood) Manufacturing','false')
       ,(337215,3379,'Other Furniture Related Product Manufacturing','false')
       ,(337215,33791,'Mattress Manufacturing','false')
       ,(337215,337910,'Mattress Manufacturing','false')
       ,(337215,33792,'Blind and Shade Manufacturing','false')
       ,(337215,337920,'Blind and Shade Manufacturing','false')
       ,(3391,33911,'Medical Equipment and Supplies Manufacturing','false')
       ,(3391,339112,'Surgical and Medical Instrument Manufacturing','false')
       ,(3391,339113,'Surgical Appliance and Supplies Manufacturing','false')
       ,(3391,339114,'Dental Equipment and Supplies Manufacturing','false')
       ,(3391,339115,'Ophthalmic Goods Manufacturing','false')
       ,(3391,339116,'Dental Laboratories','false')
       ,(3399,33991,'Jewelry and Silverware Manufacturing','false')
       ,(3399,339910,'Jewelry and Silverware Manufacturing','false')
       ,(3399,33992,'Sporting and Athletic Goods Manufacturing','false')
       ,(3399,339920,'Sporting and Athletic Goods Manufacturing','false')
       ,(3399,33993,'Doll, Toy, and Game Manufacturing','false')
       ,(3399,339930,'Doll, Toy, and Game Manufacturing','false')
       ,(3399,33994,'Office Supplies (except Paper) Manufacturing','false')
       ,(3399,339940,'Office Supplies (except Paper) Manufacturing','false')
       ,(3399,33995,'Sign Manufacturing','false')
       ,(3399,339950,'Sign Manufacturing','false')
       ,(3399,33999,'All Other Miscellaneous Manufacturing','false')
       ,(3399,339991,'Gasket, Packing, and Sealing Device Manufacturing','false')
       ,(3399,339992,'Musical Instrument Manufacturing','true')
       ,(3399,339993,'Fastener, Button, Needle, and Pin Manufacturing','false')
       ,(3399,339994,'Broom, Brush, and Mop Manufacturing','false')
       ,(3399,339995,'Burial Casket Manufacturing','true')
       ,(3399,339999,'All Other Miscellaneous Manufacturing','false')
       ,(423,4231,'Motor Vehicle and Motor Vehicle Parts and Supplies Merchant Wholesalers','false')
       ,(423,42311,'Automobile and Other Motor Vehicle Merchant Wholesalers','false')
       ,(423,423110,'Automobile and Other Motor Vehicle Merchant Wholesalers','false')
       ,(423,42312,'Motor Vehicle Supplies and New Parts Merchant Wholesalers','false')
       ,(423,423120,'Motor Vehicle Supplies and New Parts Merchant Wholesalers','false')
       ,(423,42313,'Tire and Tube Merchant Wholesalers','false')
       ,(423,423130,'Tire and Tube Merchant Wholesalers','false')
       ,(423,42314,'Motor Vehicle Parts (Used) Merchant Wholesalers','false')
       ,(423,423140,'Motor Vehicle Parts (Used) Merchant Wholesalers','false')
       ,(4232,42321,'Furniture Merchant Wholesalers','false')
       ,(4232,423210,'Furniture Merchant Wholesalers','false')
       ,(4232,42322,'Home Furnishing Merchant Wholesalers','false')
       ,(4232,423220,'Home Furnishing Merchant Wholesalers','false')
       ,(4233,42331,'Lumber, Plywood, Millwork, and Wood Panel Merchant Wholesalers','false')
       ,(4233,423310,'Lumber, Plywood, Millwork, and Wood Panel Merchant Wholesalers','false')
       ,(4233,42332,'Brick, Stone, and Related Construction Material Merchant Wholesalers','false')
       ,(4233,423320,'Brick, Stone, and Related Construction Material Merchant Wholesalers','false')
       ,(4233,42333,'Roofing, Siding, and Insulation Material Merchant Wholesalers','false')
       ,(4233,423330,'Roofing, Siding, and Insulation Material Merchant Wholesalers','false')
       ,(4233,42339,'Other Construction Material Merchant Wholesalers','false')
       ,(4233,423390,'Other Construction Material Merchant Wholesalers','false')
       ,(4234,42341,'Photographic Equipment and Supplies Merchant Wholesalers','false')
       ,(4234,423410,'Photographic Equipment and Supplies Merchant Wholesalers','false')
       ,(4234,42342,'Office Equipment Merchant Wholesalers','false')
       ,(4234,423420,'Office Equipment Merchant Wholesalers','false')
       ,(4234,42343,'Computer and Computer Peripheral Equipment and Software Merchant Wholesalers','false')
       ,(4234,423430,'Computer and Computer Peripheral Equipment and Software Merchant Wholesalers','false')
       ,(4234,42344,'Other Commercial Equipment Merchant Wholesalers','false')
       ,(4234,423440,'Other Commercial Equipment Merchant Wholesalers','false')
       ,(4234,42345,'Medical, Dental, and Hospital Equipment and Supplies Merchant Wholesalers','false')
       ,(4234,423450,'Medical, Dental, and Hospital Equipment and Supplies Merchant Wholesalers','false')
       ,(4234,42346,'Ophthalmic Goods Merchant Wholesalers','false')
       ,(4234,423460,'Ophthalmic Goods Merchant Wholesalers','false')
       ,(4234,42349,'Other Professional Equipment and Supplies Merchant Wholesalers','false')
       ,(4234,423490,'Other Professional Equipment and Supplies Merchant Wholesalers','false')
       ,(4235,42351,'Metal Service Centers and Other Metal Merchant Wholesalers','false')
       ,(4235,423510,'Metal Service Centers and Other Metal Merchant Wholesalers','false')
       ,(4235,42352,'Coal and Other Mineral and Ore Merchant Wholesalers','false')
       ,(4235,423520,'Coal and Other Mineral and Ore Merchant Wholesalers','false')
       ,(4236,42361,'Electrical Apparatus and Equipment, Wiring Supplies, and Related Equipment Merchant Wholesalers','false')
       ,(4236,423610,'Electrical Apparatus and Equipment, Wiring Supplies, and Related Equipment Merchant Wholesalers','false')
       ,(4236,42362,'Household Appliances, Electric Housewares, and Consumer Electronics Merchant Wholesalers','false')
       ,(4236,423620,'Household Appliances, Electric Housewares, and Consumer Electronics Merchant Wholesalers','false')
       ,(4236,42369,'Other Electronic Parts and Equipment Merchant Wholesalers','false')
       ,(4236,423690,'Other Electronic Parts and Equipment Merchant Wholesalers','false')
       ,(4237,42371,'Hardware Merchant Wholesalers','false')
       ,(4237,423710,'Hardware Merchant Wholesalers','false')
       ,(4237,42372,'Plumbing and Heating Equipment and Supplies (Hydronics) Merchant Wholesalers','false')
       ,(4237,423720,'Plumbing and Heating Equipment and Supplies (Hydronics) Merchant Wholesalers','false')
       ,(4237,42373,'Warm Air Heating and Air-Conditioning Equipment and Supplies Merchant Wholesalers','false')
       ,(4237,423730,'Warm Air Heating and Air-Conditioning Equipment and Supplies Merchant Wholesalers','false')
       ,(4237,42374,'Refrigeration Equipment and Supplies Merchant Wholesalers','false')
       ,(4237,423740,'Refrigeration Equipment and Supplies Merchant Wholesalers','false')
       ,(4238,42381,'Construction and Mining (except Oil Well) Machinery and Equipment Merchant Wholesalers','false')
       ,(4238,423810,'Construction and Mining (except Oil Well) Machinery and Equipment Merchant Wholesalers','false')
       ,(4238,42382,'Farm and Garden Machinery and Equipment Merchant Wholesalers','false')
       ,(4238,423820,'Farm and Garden Machinery and Equipment Merchant Wholesalers','false')
       ,(4238,42383,'Industrial Machinery and Equipment Merchant Wholesalers','false')
       ,(4238,423830,'Industrial Machinery and Equipment Merchant Wholesalers','false')
       ,(4238,42384,'Industrial Supplies Merchant Wholesalers','false')
       ,(4238,423840,'Industrial Supplies Merchant Wholesalers','false')
       ,(4238,42385,'Service Establishment Equipment and Supplies Merchant Wholesalers','false')
       ,(4238,423850,'Service Establishment Equipment and Supplies Merchant Wholesalers','false')
       ,(4238,42386,'Transportation Equipment and Supplies (except Motor Vehicle) Merchant Wholesalers','false')
       ,(4238,423860,'Transportation Equipment and Supplies (except Motor Vehicle) Merchant Wholesalers','false')
       ,(4239,42391,'Sporting and Recreational Goods and Supplies Merchant Wholesalers','false')
       ,(4239,423910,'Sporting and Recreational Goods and Supplies Merchant Wholesalers','false')
       ,(4239,42392,'Toy and Hobby Goods and Supplies Merchant Wholesalers','false')
       ,(4239,423920,'Toy and Hobby Goods and Supplies Merchant Wholesalers','false')
       ,(4239,42393,'Recyclable Material Merchant Wholesalers','false')
       ,(4239,423930,'Recyclable Material Merchant Wholesalers','false')
       ,(4239,42394,'Jewelry, Watch, Precious Stone, and Precious Metal Merchant Wholesalers','false')
       ,(4239,423940,'Jewelry, Watch, Precious Stone, and Precious Metal Merchant Wholesalers','false')
       ,(4239,42399,'Other Miscellaneous Durable Goods Merchant Wholesalers','false')
       ,(4239,423990,'Other Miscellaneous Durable Goods Merchant Wholesalers','false')
       ,(4241,42411,'Printing and Writing Paper Merchant Wholesalers','false')
       ,(4241,424110,'Printing and Writing Paper Merchant Wholesalers','false')
       ,(4241,42412,'Stationery and Office Supplies Merchant Wholesalers','false')
       ,(4241,424120,'Stationery and Office Supplies Merchant Wholesalers','false')
       ,(4241,42413,'Industrial and Personal Service Paper Merchant Wholesalers','false')
       ,(4241,424130,'Industrial and Personal Service Paper Merchant Wholesalers','false')
       ,(4242,42421,'Drugs and Druggists'' Sundries Merchant Wholesalers','false')
       ,(4242,424210,'Drugs and Druggists'' Sundries Merchant Wholesalers','false')
       ,(4243,42431,'Piece Goods, Notions, and Other Dry Goods Merchant Wholesalers','false')
       ,(4243,424310,'Piece Goods, Notions, and Other Dry Goods Merchant Wholesalers','false')
       ,(4243,42432,'Men''s and Boys'' Clothing and Furnishings Merchant Wholesalers','false')
       ,(4243,424320,'Men''s and Boys'' Clothing and Furnishings Merchant Wholesalers','false')
       ,(4243,42433,'Women''s, Children''s, and Infants'' Clothing and Accessories Merchant Wholesalers','false')
       ,(4243,424330,'Women''s, Children''s, and Infants'' Clothing and Accessories Merchant Wholesalers','false')
       ,(4243,42434,'Footwear Merchant Wholesalers','false')
       ,(4243,424340,'Footwear Merchant Wholesalers','false')
       ,(4243,42435,'Clothing and Clothing Accessories Merchant Wholesalers','false')
       ,(4243,424350,'Clothing and Clothing Accessories Merchant Wholesalers','false')
       ,(4244,42441,'General Line Grocery Merchant Wholesalers','false')
       ,(4244,424410,'General Line Grocery Merchant Wholesalers','false')
       ,(4244,42442,'Packaged Frozen Food Merchant Wholesalers','false')
       ,(4244,424420,'Packaged Frozen Food Merchant Wholesalers','false')
       ,(4244,42443,'Dairy Product (except Dried or Canned) Merchant Wholesalers','false')
       ,(4244,424430,'Dairy Product (except Dried or Canned) Merchant Wholesalers','false')
       ,(4244,42444,'Poultry and Poultry Product Merchant Wholesalers','false')
       ,(4244,424440,'Poultry and Poultry Product Merchant Wholesalers','false')
       ,(4244,42445,'Confectionery Merchant Wholesalers','false')
       ,(4244,424450,'Confectionery Merchant Wholesalers','false')
       ,(4244,42446,'Fish and Seafood Merchant Wholesalers','false')
       ,(4244,424460,'Fish and Seafood Merchant Wholesalers','false')
       ,(4244,42447,'Meat and Meat Product Merchant Wholesalers','false')
       ,(4244,424470,'Meat and Meat Product Merchant Wholesalers','false')
       ,(4244,42448,'Fresh Fruit and Vegetable Merchant Wholesalers','false')
       ,(4244,424480,'Fresh Fruit and Vegetable Merchant Wholesalers','false')
       ,(4244,42449,'Other Grocery and Related Products Merchant Wholesalers','false')
       ,(4244,424490,'Other Grocery and Related Products Merchant Wholesalers','false')
       ,(4245,42451,'Grain and Field Bean Merchant Wholesalers','false')
       ,(4245,424510,'Grain and Field Bean Merchant Wholesalers','false')
       ,(4245,42452,'Livestock Merchant Wholesalers','false')
       ,(4245,424520,'Livestock Merchant Wholesalers','false')
       ,(4245,42459,'Other Farm Product Raw Material Merchant Wholesalers','false')
       ,(4245,424590,'Other Farm Product Raw Material Merchant Wholesalers','false')
       ,(4246,42461,'Plastics Materials and Basic Forms and Shapes Merchant Wholesalers','true')
       ,(4246,424610,'Plastics Materials and Basic Forms and Shapes Merchant Wholesalers','true')
       ,(4246,42469,'Other Chemical and Allied Products Merchant Wholesalers','true')
       ,(4246,424690,'Other Chemical and Allied Products Merchant Wholesalers','true')
       ,(4247,42471,'Petroleum Bulk Stations and Terminals','false')
       ,(4247,424710,'Petroleum Bulk Stations and Terminals','false')
       ,(4247,42472,'Petroleum and Petroleum Products Merchant Wholesalers (except Bulk Stations and Terminals)','false')
       ,(4247,424720,'Petroleum and Petroleum Products Merchant Wholesalers (except Bulk Stations and Terminals)','false')
       ,(4248,42481,'Beer and Ale Merchant Wholesalers','true')
       ,(4248,424810,'Beer and Ale Merchant Wholesalers','true')
       ,(4248,42482,'Wine and Distilled Alcoholic Beverage Merchant Wholesalers','true')
       ,(4248,424820,'Wine and Distilled Alcoholic Beverage Merchant Wholesalers','true')
       ,(4249,42491,'Farm Supplies Merchant Wholesalers','false')
       ,(4249,424910,'Farm Supplies Merchant Wholesalers','false')
       ,(4249,42492,'Book, Periodical, and Newspaper Merchant Wholesalers','false')
       ,(4249,424920,'Book, Periodical, and Newspaper Merchant Wholesalers','false')
       ,(4249,42493,'Flower, Nursery Stock, and Florists'' Supplies Merchant Wholesalers','false')
       ,(4249,424930,'Flower, Nursery Stock, and Florists'' Supplies Merchant Wholesalers','false')
       ,(4249,42494,'Tobacco Product and Electronic Cigarette Merchant Wholesalers','true')
       ,(4249,424940,'Tobacco Product and Electronic Cigarette Merchant Wholesalers','true')
       ,(4249,42495,'Paint, Varnish, and Supplies Merchant Wholesalers','false')
       ,(4249,424950,'Paint, Varnish, and Supplies Merchant Wholesalers','false')
       ,(4249,42499,'Other Miscellaneous Nondurable Goods Merchant Wholesalers','false')
       ,(4249,424990,'Other Miscellaneous Nondurable Goods Merchant Wholesalers','false')
       ,(4251,42511,'Business to Business Electronic Markets','false')
       ,(4251,425110,'Business to Business Electronic Markets','false')
       ,(4251,42512,'Wholesale Trade Agents and Brokers','false')
       ,(4251,425120,'Wholesale Trade Agents and Brokers','false')
       ,(4411,44111,'New Car Dealers','false')
       ,(4411,441110,'New Car Dealers','false')
       ,(4411,44112,'Used Car Dealers','false')
       ,(4411,441120,'Used Car Dealers','false')
       ,(4412,44121,'Recreational Vehicle Dealers','false')
       ,(4412,441210,'Recreational Vehicle Dealers','false')
       ,(4412,44122,'Motorcycle, Boat, and Other Motor Vehicle Dealers','false')
       ,(4412,441222,'Boat Dealers','false')
       ,(4412,441227,'Motorcycle, ATV, and All Other Motor Vehicle Dealers','false')
       ,(4412,441228,'Motorcycle, ATV, and All Other Motor Vehicle Dealers','false')
       ,(4413,44131,'Automotive Parts and Accessories Stores','false')
       ,(4413,441310,'Automotive Parts and Accessories Stores','false')
       ,(4413,44132,'Tire Dealers','false')
       ,(4413,441320,'Tire Dealers','false')
       ,(4413,44133,'Automotive Parts and Accessories Retailers','false')
       ,(4413,441330,'Automotive Parts and Accessories Retailers','false')
       ,(4413,44134,'Tire Dealers','false')
       ,(4413,441340,'Tire Dealers','false')
       ,(4421,44211,'Furniture Stores','false')
       ,(4421,442110,'Furniture Stores','false')
       ,(4422,44221,'Floor Covering Stores','false')
       ,(4422,442210,'Floor Covering Stores','false')
       ,(4422,44229,'Other Home Furnishings Stores','false')
       ,(4422,442291,'Window Treatment Stores','false')
       ,(4422,442299,'All Other Home Furnishings Stores','false')
       ,(4431,44314,'Electronics and Appliance Stores','false')
       ,(4431,443141,'Household Appliance Stores','false')
       ,(4431,443142,'Electronics Stores','false')
       ,(4441,44411,'Home Centers','false')
       ,(4441,444110,'Home Centers','false')
       ,(4441,44412,'Paint and Wallpaper Retailers','false')
       ,(4441,444120,'Paint and Wallpaper Retailers','false')
       ,(4441,44413,'Hardware Stores','false')
       ,(4441,444130,'Hardware Stores','false')
       ,(4441,44414,'Hardware Retailers','false')
       ,(4441,444140,'Hardware Retailers','false')
       ,(4441,44418,'Other Building Material Dealers','false')
       ,(4441,444180,'Other Building Material Dealers','false')
       ,(4441,44419,'Other Building Material Dealers','false')
       ,(4441,444190,'Other Building Material Dealers','false')
       ,(4442,44421,'Outdoor Power Equipment Stores','false')
       ,(4442,444210,'Outdoor Power Equipment Stores','false')
       ,(4442,44422,'Nursery, Garden Center, and Farm Supply Stores','false')
       ,(4442,444220,'Nursery, Garden Center, and Farm Supply Stores','false')
       ,(4442,44423,'Outdoor Power Equipment Retailers','false')
       ,(4442,444230,'Outdoor Power Equipment Retailers','false')
       ,(4442,44424,'Nursery, Garden Center, and Farm Supply Retailers','false')
       ,(4442,444240,'Nursery, Garden Center, and Farm Supply Retailers','false')
       ,(4451,44511,'Supermarkets and Other Grocery Retailers (except Convenience Retailers)','false')
       ,(4451,445110,'Supermarkets and Other Grocery Retailers (except Convenience Retailers)','false')
       ,(4451,44512,'Convenience Stores','false')
       ,(4451,445120,'Convenience Stores','false')
       ,(4451,44513,'Convenience Retailers and Vending Machine Operators','false')
       ,(4451,445131,'Convenience Retailers','false')
       ,(4451,445132,'Vending Machine Operators','false')
       ,(4452,44521,'Meat Markets','false')
       ,(4452,445210,'Meat Markets','false')
       ,(4452,44522,'Fish and Seafood Markets','false')
       ,(4452,445220,'Fish and Seafood Markets','false')
       ,(4452,44523,'Fruit and Vegetable Retailers','false')
       ,(4452,445230,'Fruit and Vegetable Retailers','false')
       ,(4452,44524,'Meat Retailers','false')
       ,(4452,445240,'Meat Retailers','false')
       ,(4452,44525,'Fish and Seafood Retailers','false')
       ,(4452,445250,'Fish and Seafood Retailers','false')
       ,(4452,44529,'Other Specialty Food Retailers','false')
       ,(4452,445291,'Baked Goods Retailers','false')
       ,(4452,445292,'Confectionery and Nut Retailers','false')
       ,(4452,445298,'All Other Specialty Food Retailers','false')
       ,(4453,44531,'Beer, Wine, and Liquor Stores','true')
       ,(4453,445310,'Beer, Wine, and Liquor Stores','true')
       ,(4453,44532,'Beer, Wine, and Liquor Retailers','true')
       ,(4453,445320,'Beer, Wine, and Liquor Retailers','true')
       ,(4461,44611,'Pharmacies and Drug Stores','false')
       ,(4461,446110,'Pharmacies and Drug Stores','false')
       ,(4461,44612,'Cosmetics, Beauty Supplies, and Perfume Stores','false')
       ,(4461,446120,'Cosmetics, Beauty Supplies, and Perfume Stores','false')
       ,(4461,44613,'Optical Goods Stores','false')
       ,(4461,446130,'Optical Goods Stores','false')
       ,(4461,44619,'Other Health and Personal Care Stores','false')
       ,(4461,446191,'Food (Health) Supplement Stores','false')
       ,(4461,446199,'All Other Health and Personal Care Stores','false')
       ,(4471,44711,'Gasoline Stations with Convenience Stores','false')
       ,(4471,447110,'Gasoline Stations with Convenience Stores','false')
       ,(4471,44719,'Other Gasoline Stations','false')
       ,(4471,447190,'Other Gasoline Stations','false')
       ,(4481,44811,'Men''s Clothing Stores','false')
       ,(4481,448110,'Men''s Clothing Stores','false')
       ,(4481,44812,'Women''s Clothing Stores','false')
       ,(4481,448120,'Women''s Clothing Stores','false')
       ,(4481,44813,'Children''s and Infants'' Clothing Stores','false')
       ,(4481,448130,'Children''s and Infants'' Clothing Stores','false')
       ,(4481,44814,'Family Clothing Stores','false')
       ,(4481,448140,'Family Clothing Stores','false')
       ,(4481,44815,'Clothing Accessories Stores','false')
       ,(4481,448150,'Clothing Accessories Stores','false')
       ,(4481,44819,'Other Clothing Stores','false')
       ,(4481,448190,'Other Clothing Stores','false')
       ,(4482,44821,'Shoe Stores','false')
       ,(4482,448210,'Shoe Stores','false')
       ,(4483,44831,'Jewelry Stores','false')
       ,(4483,448310,'Jewelry Stores','false')
       ,(4483,44832,'Luggage and Leather Goods Stores','false')
       ,(4483,448320,'Luggage and Leather Goods Stores','false')
       ,(4491,44911,'Furniture Retailers','false')
       ,(4491,449110,'Furniture Retailers','false')
       ,(4491,44912,'Home Furnishings Retailers','false')
       ,(4491,449121,'Floor Covering Retailers','false')
       ,(4491,449122,'Window Treatment Retailers','false')
       ,(4491,449129,'All Other Home Furnishings Retailers','false')
       ,(4492,44921,'Electronics and Appliance Retailers','false')
       ,(4492,449210,'Electronics and Appliance Retailers','false')
       ,(4511,45111,'Sporting Goods Stores','false')
       ,(4511,451110,'Sporting Goods Stores','false')
       ,(4511,45112,'Hobby, Toy, and Game Stores','false')
       ,(4511,451120,'Hobby, Toy, and Game Stores','false')
       ,(4511,45113,'Sewing, Needlework, and Piece Goods Stores','false')
       ,(4511,451130,'Sewing, Needlework, and Piece Goods Stores','false')
       ,(4511,45114,'Musical Instrument and Supplies Stores','true')
       ,(4511,451140,'Musical Instrument and Supplies Stores','true')
       ,(4512,45121,'Book Stores and News Dealers','false')
       ,(4512,451211,'Book Stores','false')
       ,(4512,451212,'News Dealers and Newsstands','false')
       ,(4522,45221,'Department Stores','false')
       ,(4522,452210,'Department Stores','false')
       ,(4523,45231,'General Merchandise Stores, including Warehouse Clubs and Supercenters','false')
       ,(4523,452311,'Warehouse Clubs and Supercenters','false')
       ,(4523,452319,'All Other General Merchandise Stores','false')
       ,(4531,45311,'Florists','false')
       ,(4531,453110,'Florists','false')
       ,(4532,45321,'Office Supplies and Stationery Stores','false')
       ,(4532,453210,'Office Supplies and Stationery Stores','false')
       ,(4532,45322,'Gift, Novelty, and Souvenir Stores','false')
       ,(4532,453220,'Gift, Novelty, and Souvenir Stores','false')
       ,(4533,45331,'Used Merchandise Stores','false')
       ,(4533,453310,'Used Merchandise Stores','false')
       ,(4539,45391,'Pet and Pet Supplies Stores','true')
       ,(4539,453910,'Pet and Pet Supplies Stores','true')
       ,(4539,45392,'Art Dealers','false')
       ,(4539,453920,'Art Dealers','false')
       ,(4539,45393,'Manufactured (Mobile) Home Dealers','false')
       ,(4539,453930,'Manufactured (Mobile) Home Dealers','false')
       ,(4539,45399,'All Other Miscellaneous Store Retailers','false')
       ,(4539,453991,'Tobacco Stores','true')
       ,(4539,453998,'All Other Miscellaneous Store Retailers (except Tobacco Stores)','false')
       ,(4541,45411,'Electronic Shopping and Mail-Order Houses','false')
       ,(4541,454110,'Electronic Shopping and Mail-Order Houses','false')
       ,(4542,45421,'Vending Machine Operators','false')
       ,(4542,454210,'Vending Machine Operators','false')
       ,(4543,45431,'Fuel Dealers','false')
       ,(4543,454310,'Fuel Dealers','false')
       ,(4543,45439,'Other Direct Selling Establishments','false')
       ,(4543,454390,'Other Direct Selling Establishments','false')
       ,(4543,4849,'Transportation and Warehousing','false')
       ,(4551,45511,'Department Stores','false')
       ,(4551,455110,'Department Stores','false')
       ,(4552,45521,'Warehouse Clubs, Supercenters, and Other General Merchandise Retailers','false')
       ,(4552,455211,'Warehouse Clubs and Supercenters','false')
       ,(4552,455219,'All Other General Merchandise Retailers','false')
       ,(4561,45611,'Pharmacies and Drug Retailers','false')
       ,(4561,456110,'Pharmacies and Drug Retailers','false')
       ,(4561,45612,'Cosmetics, Beauty Supplies, and Perfume Retailers','false')
       ,(4561,456120,'Cosmetics, Beauty Supplies, and Perfume Retailers','false')
       ,(4561,45613,'Optical Goods Retailers','false')
       ,(4561,456130,'Optical Goods Retailers','false')
       ,(4561,45619,'Other Health and Personal Care Retailers','false')
       ,(4561,456191,'Food (Health) Supplement Retailers','false')
       ,(4561,456199,'All Other Health and Personal Care Retailers','false')
       ,(4571,45711,'Gasoline Stations with Convenience Stores','false')
       ,(4571,457110,'Gasoline Stations with Convenience Stores','false')
       ,(4571,45712,'Other Gasoline Stations','false')
       ,(4571,457120,'Other Gasoline Stations','false')
       ,(4571,4572,'Fuel Dealers','false')
       ,(4571,45721,'Fuel Dealers','false')
       ,(4571,457210,'Fuel Dealers','false')
       ,(4581,45811,'Clothing and Clothing Accessories Retailers','false')
       ,(4581,458110,'Clothing and Clothing Accessories Retailers','false')
       ,(4581,4582,'Shoe Retailers','false')
       ,(4581,45821,'Shoe Retailers','false')
       ,(4581,458210,'Shoe Retailers','false')
       ,(4581,4583,'Jewelry, Luggage, and Leather Goods Retailers','false')
       ,(4581,45831,'Jewelry Retailers','false')
       ,(4581,458310,'Jewelry Retailers','false')
       ,(4581,45832,'Luggage and Leather Goods Retailers','false')
       ,(4581,458320,'Luggage and Leather Goods Retailers','false')
       ,(4591,45911,'Sporting Goods Retailers','false')
       ,(4591,459110,'Sporting Goods Retailers','false')
       ,(4591,45912,'Hobby, Toy, and Game Retailers','false')
       ,(4591,459120,'Hobby, Toy, and Game Retailers','false')
       ,(4591,45913,'Sewing, Needlework, and Piece Goods Retailers','false')
       ,(4591,459130,'Sewing, Needlework, and Piece Goods Retailers','false')
       ,(4591,45914,'Musical Instrument and Supplies Retailers','false')
       ,(4591,459140,'Musical Instrument and Supplies Retailers','false')
       ,(4591,4592,'Book Retailers and News Dealers','false')
       ,(4591,45921,'Book Retailers and News Dealers','false')
       ,(4591,459210,'Book Retailers and News Dealers','false')
       ,(4591,4593,'Florists','false')
       ,(4591,45931,'Florists','false')
       ,(4591,459310,'Florists','false')
       ,(4591,4594,'Office Supplies, Stationery, and Gift Retailers','false')
       ,(4591,45941,'Office Supplies and Stationery Retailers','false')
       ,(4591,459410,'Office Supplies and Stationery Retailers','false')
       ,(4591,45942,'Gift, Novelty, and Souvenir Retailers','false')
       ,(4591,459420,'Gift, Novelty, and Souvenir Retailers','false')
       ,(4591,4595,'Used Merchandise Retailers','false')
       ,(4591,45951,'Used Merchandise Retailers','false')
       ,(4591,459510,'Used Merchandise Retailers','false')
       ,(4591,4599,'Other Miscellaneous Retailers','false')
       ,(4591,45991,'Pet and Pet Supplies Retailers','false')
       ,(4591,459910,'Pet and Pet Supplies Retailers','false')
       ,(4591,45992,'Art Dealers','false')
       ,(4591,459920,'Art Dealers','false')
       ,(4591,45993,'Manufactured (Mobile) Home Dealers','false')
       ,(4591,459930,'Manufactured (Mobile) Home Dealers','false')
       ,(4591,45999,'All Other Miscellaneous Retailers','false')
       ,(4591,459991,'Tobacco, Electronic Cigarette, and Other Smoking Supplies Retailers','true')
       ,(4591,459999,'All Other Miscellaneous Retailers','false')
       ,(4811,48111,'Scheduled Air Transportation','false')
       ,(4811,481111,'Scheduled Passenger Air Transportation','false')
       ,(4811,481112,'Scheduled Freight Air Transportation','false')
       ,(4812,48121,'Nonscheduled Air Transportation','false')
       ,(4812,481211,'Nonscheduled Chartered Passenger Air Transportation','false')
       ,(4812,481212,'Nonscheduled Chartered Freight Air Transportation','false')
       ,(4812,481219,'Other Nonscheduled Air Transportation','false')
       ,(4821,48211,'Rail Transportation','false')
       ,(4821,482111,'Line-Haul Railroads','false')
       ,(4821,482112,'Short Line Railroads','false')
       ,(4831,48311,'Deep Sea, Coastal, and Great Lakes Water Transportation','false')
       ,(4831,483111,'Deep Sea Freight Transportation','false')
       ,(4831,483112,'Deep Sea Passenger Transportation','false')
       ,(4831,483113,'Coastal and Great Lakes Freight Transportation','false')
       ,(4831,483114,'Coastal and Great Lakes Passenger Transportation','false')
       ,(4832,48321,'Inland Water Transportation','false')
       ,(4832,483211,'Inland Water Freight Transportation','false')
       ,(4832,483212,'Inland Water Passenger Transportation','false')
       ,(4841,48411,'General Freight Trucking, Local','false')
       ,(4841,484110,'General Freight Trucking, Local','false')
       ,(4841,48412,'General Freight Trucking, Long-Distance','false')
       ,(4841,484121,'General Freight Trucking, Long-Distance, Truckload','false')
       ,(4841,484122,'General Freight Trucking, Long-Distance, Less Than Truckload','false')
       ,(4842,48421,'Used Household and Office Goods Moving','false')
       ,(4842,484210,'Used Household and Office Goods Moving','false')
       ,(4842,48422,'Specialized Freight (except Used Goods) Trucking, Local','false')
       ,(4842,484220,'Specialized Freight (except Used Goods) Trucking, Local','false')
       ,(4842,48423,'Specialized Freight (except Used Goods) Trucking, Long-Distance','false')
       ,(4842,484230,'Specialized Freight (except Used Goods) Trucking, Long-Distance','false')
       ,(4851,48511,'Urban Transit Systems','false')
       ,(4851,485111,'Mixed Mode Transit Systems','false')
       ,(4851,485112,'Commuter Rail Systems','false')
       ,(4851,485113,'Bus and Other Motor Vehicle Transit Systems','false')
       ,(4851,485119,'Other Urban Transit Systems','false')
       ,(4852,48521,'Interurban and Rural Bus Transportation','false')
       ,(4852,485210,'Interurban and Rural Bus Transportation','false')
       ,(4853,48531,'Taxi and Ridesharing Services','false')
       ,(4853,485310,'Taxi and Ridesharing Services','false')
       ,(4853,48532,'Limousine Service','false')
       ,(4853,485320,'Limousine Service','false')
       ,(4854,48541,'School and Employee Bus Transportation','false')
       ,(4854,485410,'School and Employee Bus Transportation','false')
       ,(4855,48551,'Charter Bus Industry','false')
       ,(4855,485510,'Charter Bus Industry','false')
       ,(4859,48599,'Other Transit and Ground Passenger Transportation','false')
       ,(4859,485991,'Special Needs Transportation','false')
       ,(4859,485999,'All Other Transit and Ground Passenger Transportation','false')
       ,(4861,48611,'Pipeline Transportation of Crude Oil','false')
       ,(4861,486110,'Pipeline Transportation of Crude Oil','false')
       ,(4862,48621,'Pipeline Transportation of Natural Gas','false')
       ,(4862,486210,'Pipeline Transportation of Natural Gas','false')
       ,(4869,48691,'Pipeline Transportation of Refined Petroleum Products','false')
       ,(4869,486910,'Pipeline Transportation of Refined Petroleum Products','false')
       ,(4869,48699,'All Other Pipeline Transportation','false')
       ,(4869,486990,'All Other Pipeline Transportation','false')
       ,(4871,48711,'Scenic and Sightseeing Transportation, Land','false')
       ,(4871,487110,'Scenic and Sightseeing Transportation, Land','false')
       ,(4872,48721,'Scenic and Sightseeing Transportation, Water','false')
       ,(4872,487210,'Scenic and Sightseeing Transportation, Water','false')
       ,(4879,48799,'Scenic and Sightseeing Transportation, Other','false')
       ,(4879,487990,'Scenic and Sightseeing Transportation, Other','false')
       ,(4881,48811,'Airport Operations','false')
       ,(4881,488111,'Air Traffic Control','false')
       ,(4881,488119,'Other Airport Operations','false')
       ,(4881,48819,'Other Support Activities for Air Transportation','false')
       ,(4881,488190,'Other Support Activities for Air Transportation','false')
       ,(4882,48821,'Support Activities for Rail Transportation','false')
       ,(4882,488210,'Support Activities for Rail Transportation','false')
       ,(4883,48831,'Port and Harbor Operations','false')
       ,(4883,488310,'Port and Harbor Operations','false')
       ,(4883,48832,'Marine Cargo Handling','false')
       ,(4883,488320,'Marine Cargo Handling','false')
       ,(4883,48833,'Navigational Services to Shipping','false')
       ,(4883,488330,'Navigational Services to Shipping','false')
       ,(4883,48839,'Other Support Activities for Water Transportation','false')
       ,(4883,488390,'Other Support Activities for Water Transportation','false')
       ,(4884,48841,'Motor Vehicle Towing','false')
       ,(4884,488410,'Motor Vehicle Towing','false')
       ,(4884,48849,'Other Support Activities for Road Transportation','false')
       ,(4884,488490,'Other Support Activities for Road Transportation','false')
       ,(4885,48851,'Freight Transportation Arrangement','false')
       ,(4885,488510,'Freight Transportation Arrangement','false')
       ,(4889,48899,'Other Support Activities for Transportation','false')
       ,(4889,488991,'Packing and Crating','false')
       ,(4889,488999,'All Other Support Activities for Transportation','false')
       ,(4911,49111,'Postal Service','false')
       ,(4911,491110,'Postal Service','false')
       ,(4921,49211,'Couriers and Express Delivery Services','false')
       ,(4921,492110,'Couriers and Express Delivery Services','false')
       ,(4922,49221,'Local Messengers and Local Delivery','false')
       ,(4922,492210,'Local Messengers and Local Delivery','false')
       ,(4931,49311,'General Warehousing and Storage','false')
       ,(4931,493110,'General Warehousing and Storage','false')
       ,(4931,49312,'Refrigerated Warehousing and Storage','false')
       ,(4931,493120,'Refrigerated Warehousing and Storage','false')
       ,(4931,49313,'Farm Product Warehousing and Storage','false')
       ,(4931,493130,'Farm Product Warehousing and Storage','false')
       ,(4931,49319,'Other Warehousing and Storage','false')
       ,(4931,493190,'Other Warehousing and Storage','false')
       ,(5111,51111,'Newspaper Publishers','true')
       ,(5111,511110,'Newspaper Publishers','true')
       ,(5111,51112,'Periodical Publishers','true')
       ,(5111,511120,'Periodical Publishers','true')
       ,(5111,51113,'Book Publishers','true')
       ,(5111,511130,'Book Publishers','true')
       ,(5111,51114,'Directory and Mailing List Publishers','true')
       ,(5111,511140,'Directory and Mailing List Publishers','true')
       ,(5111,51119,'Other Publishers','true')
       ,(5111,511191,'Greeting Card Publishers','true')
       ,(5111,511199,'All Other Publishers','true')
       ,(5112,51121,'Software Publishers','true')
       ,(5112,511210,'Software Publishers','true')
       ,(5121,51211,'Motion Picture and Video Production','true')
       ,(5121,512110,'Motion Picture and Video Production','true')
       ,(5121,51212,'Motion Picture and Video Distribution','true')
       ,(5121,512120,'Motion Picture and Video Distribution','true')
       ,(5121,51213,'Motion Picture and Video Exhibition','true')
       ,(5121,512131,'Motion Picture Theaters (except Drive-Ins)','true')
       ,(5121,512132,'Drive-In Motion Picture Theaters','true')
       ,(5121,51219,'Postproduction Services and Other Motion Picture and Video Industries','true')
       ,(5121,512191,'Teleproduction and Other Postproduction Services','true')
       ,(5121,512199,'Other Motion Picture and Video Industries','true')
       ,(5122,51223,'Music Publishers','true')
       ,(5122,512230,'Music Publishers','true')
       ,(5122,51224,'Sound Recording Studios','true')
       ,(5122,512240,'Sound Recording Studios','true')
       ,(5122,51225,'Record Production and Distribution','true')
       ,(5122,512250,'Record Production and Distribution','true')
       ,(5122,51229,'Other Sound Recording Industries','true')
       ,(5122,512290,'Other Sound Recording Industries','true')
       ,(5131,51311,'Newspaper PublishersT','true')
       ,(5131,513110,'Newspaper Publishers','true')
       ,(5131,51312,'Periodical PublishersT','true')
       ,(5131,513120,'Periodical Publishers','true')
       ,(5131,51313,'Book PublishersT','true')
       ,(5131,513130,'Book Publishers','true')
       ,(5131,51314,'Directory and Mailing List PublishersT','true')
       ,(5131,513140,'Directory and Mailing List Publishers','true')
       ,(5131,51319,'Other PublishersT','true')
       ,(5131,513191,'Greeting Card Publishers','true')
       ,(5131,513199,'All Other Publishers','true')
       ,(5132,51321,'Software PublishersT','true')
       ,(5132,513210,'Software Publishers','true')
       ,(5151,51511,'Radio Broadcasting','true')
       ,(5151,515111,'Radio Networks','true')
       ,(5151,515112,'Radio Stations','true')
       ,(5151,51512,'Television Broadcasting','true')
       ,(5151,515120,'Television Broadcasting','true')
       ,(5152,51521,'Cable and Other Subscription Programming','true')
       ,(5152,515210,'Cable and Other Subscription Programming','true')
       ,(5161,51611,'Radio Broadcasting Stations','true')
       ,(5161,516110,'Radio Broadcasting Stations','true')
       ,(51612,516120,'Television Broadcasting Stations','true')
       ,(51612,5162,'Media Streaming Distribution Services, Social Networks, and Other Media Networks and Content ProvidersT','true')
       ,(51612,51621,'Media Streaming Distribution Services, Social Networks, and Other Media Networks and Content ProvidersT','true')
       ,(51612,516210,'Media Streaming Distribution Services, Social Networks, and Other Media Networks and Content Providers','true')
       ,(5171,51711,'Wired and Wireless Telecommunications Carriers (except Satellite)','true')
       ,(5171,517111,'Wired Telecommunications Carriers','true')
       ,(5171,517112,'Wireless Telecommunications Carriers (except Satellite)','true')
       ,(5171,51712,'Telecommunications Resellers and Agents for Wireless Telecommunication Services','true')
       ,(5171,517121,'Telecommunications Resellers','true')
       ,(5171,517122,'Agents for Wireless Telecommunications Services','true')
       ,(5173,51731,'Wired and Wireless Telecommunications Carriers','true')
       ,(5173,517311,'Wired Telecommunications Carriers','true')
       ,(5173,517312,'Wireless Telecommunications Carriers (except Satellite)','true')
       ,(5174,51741,'Satellite Telecommunications','true')
       ,(5174,517410,'Satellite Telecommunications','true')
       ,(5178,51781,'All Other Telecommunications','true')
       ,(5178,517810,'All Other Telecommunications','true')
       ,(5179,51791,'Other Telecommunications','true')
       ,(5179,517911,'Telecommunications Resellers','true')
       ,(5179,517919,'All Other Telecommunications','true')
       ,(5182,51821,'Computing Infrastructure Providers, Data Processing, Web Hosting, and Related Services','true')
       ,(5182,518210,'Computing Infrastructure Providers, Data Processing, Web Hosting, and Related Services','true')
       ,(5191,51911,'News Syndicates','true')
       ,(5191,519110,'News Syndicates','true')
       ,(5191,51912,'Libraries and Archives','true')
       ,(5191,519120,'Libraries and Archives','true')
       ,(5191,51913,'Internet Publishing and Broadcasting and Web Search Portals','true')
       ,(5191,519130,'Internet Publishing and Broadcasting and Web Search Portals','true')
       ,(5191,51919,'All Other Information Services','true')
       ,(5191,519190,'All Other Information Services','true')
       ,(5191,5192,'Web Search Portals, Libraries, Archives, and Other Information ServicesT','true')
       ,(5191,51921,'Libraries and ArchivesT','true')
       ,(5191,519210,'Libraries and Archives','true')
       ,(5191,51929,'Web Search Portals and All Other Information ServicesT','true')
       ,(5191,519290,'Web Search Portals and All Other Information Services','true')
       ,(5211,52111,'Monetary Authorities-Central Bank','true')
       ,(5211,521110,'Monetary Authorities-Central Bank','true')
       ,(5221,52211,'Commercial Banking','true')
       ,(5221,522110,'Commercial Banking','true')
       ,(5221,52212,'Savings Institutions','true')
       ,(5221,522120,'Savings Institutions','true')
       ,(5221,52213,'Credit Unions','true')
       ,(5221,522130,'Credit Unions','true')
       ,(5221,52218,'Savings Institutions and Other Depository Credit Intermediation','true')
       ,(5221,522180,'Savings Institutions and Other Depository Credit Intermediation','true')
       ,(5221,52219,'Other Depository Credit Intermediation','true')
       ,(5221,522190,'Other Depository Credit Intermediation','true')
       ,(5222,52221,'Credit Card Issuing','true')
       ,(5222,522210,'Credit Card Issuing','true')
       ,(5222,52222,'Sales Financing','true')
       ,(5222,522220,'Sales Financing','true')
       ,(5222,52229,'Other Nondepository Credit Intermediation','true')
       ,(5222,522291,'Consumer Lending','true')
       ,(5222,522292,'Real Estate Credit','true')
       ,(5222,522293,'International Trade Financing','true')
       ,(5222,522294,'Secondary Market Financing','true')
       ,(5222,522298,'All Other Nondepository Credit Intermediation','true')
       ,(5222,522299,'International, Secondary Market, and All Other Nondepository Credit Intermediation','true')
       ,(5223,52231,'Mortgage and Nonmortgage Loan Brokers','true')
       ,(5223,522310,'Mortgage and Nonmortgage Loan Brokers','true')
       ,(5223,52232,'Financial Transactions Processing, Reserve, and Clearinghouse Activities','true')
       ,(5223,522320,'Financial Transactions Processing, Reserve, and Clearinghouse Activities','true')
       ,(5223,52239,'Other Activities Related to Credit Intermediation','true')
       ,(5223,522390,'Other Activities Related to Credit Intermediation','true')
       ,(5231,52311,'Investment Banking and Securities Dealing','true')
       ,(5231,523110,'Investment Banking and Securities Dealing','true')
       ,(5231,52312,'Securities Brokerage','true')
       ,(5231,523120,'Securities Brokerage','true')
       ,(5231,52313,'Commodity Contracts Dealing','true')
       ,(5231,523130,'Commodity Contracts Dealing','true')
       ,(5231,52314,'Commodity Contracts Brokerage','true')
       ,(5231,523140,'Commodity Contracts Brokerage','true')
       ,(5231,52315,'Investment Banking and Securities Intermediation','true')
       ,(5231,523150,'Investment Banking and Securities Intermediation','true')
       ,(5231,52316,'Commodity Contracts Intermediation','true')
       ,(5231,523160,'Commodity Contracts Intermediation','true')
       ,(5232,52321,'Securities and Commodity Exchanges','true')
       ,(5232,523210,'Securities and Commodity Exchanges','true')
       ,(5239,52391,'Miscellaneous Intermediation','true')
       ,(5239,523910,'Miscellaneous Intermediation','true')
       ,(5239,52392,'Portfolio Management','true')
       ,(5239,523920,'Portfolio Management','true')
       ,(5239,52393,'Investment Advice','true')
       ,(5239,523930,'Investment Advice','true')
       ,(5239,52394,'Portfolio Management and Investment Advice','true')
       ,(5239,523940,'Portfolio Management and Investment Advice','true')
       ,(5239,52399,'All Other Financial Investment Activities','true')
       ,(5239,523991,'Trust, Fiduciary, and Custody Activities','true')
       ,(5239,523999,'Miscellaneous Financial Investment Activities','true')
       ,(5241,52411,'Direct Life, Health, and Medical Insurance Carriers','true')
       ,(5241,524113,'Direct Life Insurance Carriers','true')
       ,(5241,524114,'Direct Health and Medical Insurance Carriers','true')
       ,(5241,52412,'Direct Insurance (except Life, Health, and Medical) Carriers','true')
       ,(5241,524126,'Direct Property and Casualty Insurance Carriers','true')
       ,(5241,524127,'Direct Title Insurance Carriers','true')
       ,(5241,524128,'Other Direct Insurance (except Life, Health, and Medical) Carriers','true')
       ,(5241,52413,'Reinsurance Carriers','true')
       ,(5241,524130,'Reinsurance Carriers','true')
       ,(5242,52421,'Insurance Agencies and Brokerages','true')
       ,(5242,524210,'Insurance Agencies and Brokerages','true')
       ,(5242,52429,'Other Insurance Related Activities','true')
       ,(5242,524291,'Claims Adjusting','true')
       ,(5242,524292,'Pharmacy Benefit Management and Other Third Party Administration of Insurance and Pension Funds','true')
       ,(5242,524298,'All Other Insurance Related Activities','true')
       ,(5251,52511,'Pension Funds','true')
       ,(5251,525110,'Pension Funds','true')
       ,(5251,52512,'Health and Welfare Funds','true')
       ,(5251,525120,'Health and Welfare Funds','true')
       ,(5251,52519,'Other Insurance Funds','true')
       ,(5251,525190,'Other Insurance Funds','true')
       ,(5259,52591,'Open-End Investment Funds','true')
       ,(5259,525910,'Open-End Investment Funds','true')
       ,(5259,52592,'Trusts, Estates, and Agency Accounts','true')
       ,(5259,525920,'Trusts, Estates, and Agency Accounts','true')
       ,(5259,52599,'Other Financial Vehicles','true')
       ,(5259,525990,'Other Financial Vehicles','true')
       ,(5311,53111,'Lessors of Residential Buildings and Dwellings','false')
       ,(5311,531110,'Lessors of Residential Buildings and Dwellings','false')
       ,(5311,53112,'Lessors of Nonresidential Buildings (except Miniwarehouses)','false')
       ,(5311,531120,'Lessors of Nonresidential Buildings (except Miniwarehouses)','false')
       ,(5311,53113,'Lessors of Miniwarehouses and Self-Storage Units','false')
       ,(5311,531130,'Lessors of Miniwarehouses and Self-Storage Units','false')
       ,(5311,53119,'Lessors of Other Real Estate Property','false')
       ,(5311,531190,'Lessors of Other Real Estate Property','false')
       ,(5312,53121,'Offices of Real Estate Agents and Brokers','false')
       ,(5312,531210,'Offices of Real Estate Agents and Brokers','false')
       ,(5313,53131,'Real Estate Property Managers','false')
       ,(5313,531311,'Residential Property Managers','false')
       ,(5313,531312,'Nonresidential Property Managers','false')
       ,(5313,53132,'Offices of Real Estate Appraisers','false')
       ,(5313,531320,'Offices of Real Estate Appraisers','false')
       ,(5313,53139,'Other Activities Related to Real Estate','false')
       ,(5313,531390,'Other Activities Related to Real Estate','false')
       ,(5321,53211,'Passenger Car Rental and Leasing','false')
       ,(5321,532111,'Passenger Car Rental','false')
       ,(5321,532112,'Passenger Car Leasing','false')
       ,(5321,53212,'Truck, Utility Trailer, and RV (Recreational Vehicle) Rental and Leasing','false')
       ,(5321,532120,'Truck, Utility Trailer, and RV (Recreational Vehicle) Rental and Leasing','false')
       ,(5322,53221,'Consumer Electronics and Appliances Rental','false')
       ,(5322,532210,'Consumer Electronics and Appliances Rental','false')
       ,(5322,53228,'Other Consumer Goods Rental','false')
       ,(5322,532281,'Formal Wear and Costume Rental','false')
       ,(5322,532282,'Video Tape and Disc Rental','true')
       ,(5322,532283,'Home Health Equipment Rental','false')
       ,(5322,532284,'Recreational Goods Rental','false')
       ,(5322,532289,'All Other Consumer Goods Rental','false')
       ,(5323,53231,'General Rental Centers','false')
       ,(5323,532310,'General Rental Centers','false')
       ,(5324,53241,'Construction, Transportation, Mining, and Forestry Machinery and Equipment Rental and Leasing','false')
       ,(5324,532411,'Commercial Air, Rail, and Water Transportation Equipment Rental and Leasing','false')
       ,(5324,532412,'Construction, Mining, and Forestry Machinery and Equipment Rental and Leasing','false')
       ,(5324,53242,'Office Machinery and Equipment Rental and Leasing','false')
       ,(5324,532420,'Office Machinery and Equipment Rental and Leasing','false')
       ,(5324,53249,'Other Commercial and Industrial Machinery and Equipment Rental and Leasing','false')
       ,(5324,532490,'Other Commercial and Industrial Machinery and Equipment Rental and Leasing','false')
       ,(5331,53311,'Lessors of Nonfinancial Intangible Assets (except Copyrighted Works)','false')
       ,(5331,533110,'Lessors of Nonfinancial Intangible Assets (except Copyrighted Works)','false')
       ,(5411,54111,'Offices of Lawyers','false')
       ,(5411,541110,'Offices of Lawyers','false')
       ,(5411,54112,'Offices of Notaries','false')
       ,(5411,541120,'Offices of Notaries','false')
       ,(5411,54119,'Other Legal Services','false')
       ,(5411,541191,'Title Abstract and Settlement Offices','false')
       ,(5411,541199,'All Other Legal Services','false')
       ,(5412,54121,'Accounting, Tax Preparation, Bookkeeping, and Payroll Services','false')
       ,(5412,541211,'Offices of Certified Public Accountants','false')
       ,(5412,541213,'Tax Preparation Services','false')
       ,(5412,541214,'Payroll Services','false')
       ,(5412,541219,'Other Accounting Services','false')
       ,(5413,54131,'Architectural Services','false')
       ,(5413,541310,'Architectural Services','false')
       ,(5413,54132,'Landscape Architectural Services','false')
       ,(5413,541320,'Landscape Architectural Services','false')
       ,(5413,54133,'Engineering Services','false')
       ,(5413,541330,'Engineering Services','false')
       ,(5413,54134,'Drafting Services','false')
       ,(5413,541340,'Drafting Services','false')
       ,(5413,54135,'Building Inspection Services','false')
       ,(5413,541350,'Building Inspection Services','false')
       ,(5413,54136,'Geophysical Surveying and Mapping Services','false')
       ,(5413,541360,'Geophysical Surveying and Mapping Services','false')
       ,(5413,54137,'Surveying and Mapping (except Geophysical) Services','false')
       ,(5413,541370,'Surveying and Mapping (except Geophysical) Services','false')
       ,(5413,54138,'Testing Laboratories and Services','false')
       ,(5413,541380,'Testing Laboratories and Services','false')
       ,(5414,54141,'Interior Design Services','false')
       ,(5414,541410,'Interior Design Services','false')
       ,(5414,54142,'Industrial Design Services','false')
       ,(5414,541420,'Industrial Design Services','false')
       ,(5414,54143,'Graphic Design Services','false')
       ,(5414,541430,'Graphic Design Services','false')
       ,(5414,54149,'Other Specialized Design Services','false')
       ,(5414,541490,'Other Specialized Design Services','false')
       ,(5415,54151,'Computer Systems Design and Related Services','false')
       ,(5415,541511,'Custom Computer Programming Services','false')
       ,(5415,541512,'Computer Systems Design Services','false')
       ,(5415,541513,'Computer Facilities Management Services','false')
       ,(5415,541519,'Other Computer Related Services','false')
       ,(5416,54161,'Management Consulting Services','false')
       ,(5416,541611,'Administrative Management and General Management Consulting Services','false')
       ,(5416,541612,'Human Resources Consulting Services','false')
       ,(5416,541613,'Marketing Consulting Services','false')
       ,(5416,541614,'Process, Physical Distribution, and Logistics Consulting Services','false')
       ,(5416,541618,'Other Management Consulting Services','false')
       ,(5416,54162,'Environmental Consulting Services','false')
       ,(5416,541620,'Environmental Consulting Services','false')
       ,(5416,54169,'Other Scientific and Technical Consulting Services','false')
       ,(5416,541690,'Other Scientific and Technical Consulting Services','false')
       ,(5417,54171,'Research and Development in the Physical, Engineering, and Life Sciences','false')
       ,(5417,541713,'Research and Development in Nanotechnology','false')
       ,(5417,541714,'Research and Development in Biotechnology (except Nanobiotechnology)','false')
       ,(5417,541715,'Research and Development in the Physical, Engineering, and Life Sciences (except Nanotechnology and Biotechnology)','false')
       ,(5417,54172,'Research and Development in the Social Sciences and Humanities','false')
       ,(5417,541720,'Research and Development in the Social Sciences and Humanities','false')
       ,(5418,54181,'Advertising Agencies','true')
       ,(5418,541810,'Advertising Agencies','true')
       ,(5418,54182,'Public Relations Agencies','true')
       ,(5418,541820,'Public Relations Agencies','true')
       ,(5418,54183,'Media Buying Agencies','true')
       ,(5418,541830,'Media Buying Agencies','true')
       ,(5418,54184,'Media Representatives','true')
       ,(5418,541840,'Media Representatives','true')
       ,(5418,54185,'Indoor and Outdoor Display Advertising','true')
       ,(5418,541850,'Indoor and Outdoor Display Advertising','true')
       ,(5418,54186,'Direct Mail Advertising','true')
       ,(5418,541860,'Direct Mail Advertising','true')
       ,(5418,54187,'Advertising Material Distribution Services','true')
       ,(5418,541870,'Advertising Material Distribution Services','true')
       ,(5418,54189,'Other Services Related to Advertising','true')
       ,(5418,541890,'Other Services Related to Advertising','true')
       ,(5419,54191,'Marketing Research and Public Opinion Polling','false')
       ,(5419,541910,'Marketing Research and Public Opinion Polling','false')
       ,(5419,54192,'Photographic Services','false')
       ,(5419,541921,'Photography Studios, Portrait','false')
       ,(5419,541922,'Commercial Photography','false')
       ,(5419,54193,'Translation and Interpretation Services','false')
       ,(5419,541930,'Translation and Interpretation Services','false')
       ,(5419,54194,'Veterinary Services','false')
       ,(5419,541940,'Veterinary Services','false')
       ,(5419,54199,'All Other Professional, Scientific, and Technical Services','false')
       ,(5419,541990,'All Other Professional, Scientific, and Technical Services','false')
       ,(5511,55111,'Management of Companies and Enterprises','false')
       ,(5511,551111,'Offices of Bank Holding Companies','true')
       ,(5511,551112,'Offices of Other Holding Companies','false')
       ,(5511,551114,'Corporate, Subsidiary, and Regional Managing Offices','false')
       ,(5611,56111,'Office Administrative Services','false')
       ,(5611,561110,'Office Administrative Services','false')
       ,(5612,56121,'Facilities Support Services','false')
       ,(5612,561210,'Facilities Support Services','false')
       ,(5613,56131,'Employment Placement Agencies and Executive Search Services','false')
       ,(5613,561311,'Employment Placement Agencies','false')
       ,(5613,561312,'Executive Search Services','false')
       ,(5613,56132,'Temporary Help Services','false')
       ,(5613,561320,'Temporary Help Services','false')
       ,(5613,56133,'Professional Employer Organizations','false')
       ,(5613,561330,'Professional Employer Organizations','false')
       ,(5614,56141,'Document Preparation Services','false')
       ,(5614,561410,'Document Preparation Services','false')
       ,(5614,56142,'Telephone Call Centers','false')
       ,(5614,561421,'Telephone Answering Services','false')
       ,(5614,561422,'Telemarketing Bureaus and Other Contact Centers','false')
       ,(5614,56143,'Business Service Centers','false')
       ,(5614,561431,'Private Mail Centers','false')
       ,(5614,561439,'Other Business Service Centers (including Copy Shops)','false')
       ,(5614,56144,'Collection Agencies','false')
       ,(5614,561440,'Collection Agencies','false')
       ,(5614,56145,'Credit Bureaus','false')
       ,(5614,561450,'Credit Bureaus','false')
       ,(5614,56149,'Other Business Support Services','false')
       ,(5614,561491,'Repossession Services','false')
       ,(5614,561492,'Court Reporting and Stenotype Services','false')
       ,(5614,561499,'All Other Business Support Services','false')
       ,(5615,56151,'Travel Agencies','false')
       ,(5615,561510,'Travel Agencies','false')
       ,(5615,56152,'Tour Operators','false')
       ,(5615,561520,'Tour Operators','false')
       ,(5615,56159,'Other Travel Arrangement and Reservation Services','false')
       ,(5615,561591,'Convention and Visitors Bureaus','false')
       ,(5615,561599,'All Other Travel Arrangement and Reservation Services','false')
       ,(5616,56161,'Investigation, Guard, and Armored Car Services','false')
       ,(5616,561611,'Investigation and Personal Background Check Services','false')
       ,(5616,561612,'Security Guards and Patrol Services','false')
       ,(5616,561613,'Armored Car Services','false')
       ,(5616,56162,'Security Systems Services','false')
       ,(5616,561621,'Security Systems Services (except Locksmiths)','false')
       ,(5616,561622,'Locksmiths','false')
       ,(5617,56171,'Exterminating and Pest Control Services','true')
       ,(5617,561710,'Exterminating and Pest Control Services','true')
       ,(5617,56172,'Janitorial Services','false')
       ,(5617,561720,'Janitorial Services','false')
       ,(5617,56173,'Landscaping Services','false')
       ,(5617,561730,'Landscaping Services','false')
       ,(5617,56174,'Carpet and Upholstery Cleaning Services','false')
       ,(5617,561740,'Carpet and Upholstery Cleaning Services','false')
       ,(5617,56179,'Other Services to Buildings and Dwellings','false')
       ,(5617,561790,'Other Services to Buildings and Dwellings','false')
       ,(5619,56191,'Packaging and Labeling Services','false')
       ,(5619,561910,'Packaging and Labeling Services','false')
       ,(5619,56192,'Convention and Trade Show Organizers','false')
       ,(5619,561920,'Convention and Trade Show Organizers','false')
       ,(5619,56199,'All Other Support Services','false')
       ,(5619,561990,'All Other Support Services','false')
       ,(5621,56211,'Waste Collection','false')
       ,(5621,562111,'Solid Waste Collection','false')
       ,(5621,562112,'Hazardous Waste Collection','false')
       ,(5621,562119,'Other Waste Collection','false')
       ,(5622,56221,'Waste Treatment and Disposal','false')
       ,(5622,562211,'Hazardous Waste Treatment and Disposal','false')
       ,(5622,562212,'Solid Waste Landfill','false')
       ,(5622,562213,'Solid Waste Combustors and Incinerators','false')
       ,(5622,562219,'Other Nonhazardous Waste Treatment and Disposal','false')
       ,(5629,56291,'Remediation Services','false')
       ,(5629,562910,'Remediation Services','false')
       ,(5629,56292,'Materials Recovery Facilities','false')
       ,(5629,562920,'Materials Recovery Facilities','false')
       ,(5629,56299,'All Other Waste Management Services','false')
       ,(5629,562991,'Septic Tank and Related Services','false')
       ,(5629,562998,'All Other Miscellaneous Waste Management Services','false')
       ,(6111,61111,'Elementary and Secondary Schools','false')
       ,(6111,611110,'Elementary and Secondary Schools','false')
       ,(6112,61121,'Junior Colleges','false')
       ,(6112,611210,'Junior Colleges','false')
       ,(6113,61131,'Colleges, Universities, and Professional Schools','false')
       ,(6113,611310,'Colleges, Universities, and Professional Schools','false')
       ,(6114,61141,'Business and Secretarial Schools','false')
       ,(6114,611410,'Business and Secretarial Schools','false')
       ,(6114,61142,'Computer Training','false')
       ,(6114,611420,'Computer Training','false')
       ,(6114,61143,'Professional and Management Development Training','false')
       ,(6114,611430,'Professional and Management Development Training','false')
       ,(6115,61151,'Technical and Trade Schools','false')
       ,(6115,611511,'Cosmetology and Barber Schools','false')
       ,(6115,611512,'Flight Training','false')
       ,(6115,611513,'Apprenticeship Training','false')
       ,(6115,611519,'Other Technical and Trade Schools','false')
       ,(6116,61161,'Fine Arts Schools','false')
       ,(6116,611610,'Fine Arts Schools','false')
       ,(6116,61162,'Sports and Recreation Instruction','false')
       ,(6116,611620,'Sports and Recreation Instruction','false')
       ,(6116,61163,'Language Schools','false')
       ,(6116,611630,'Language Schools','false')
       ,(6116,61169,'All Other Schools and Instruction','false')
       ,(6116,611691,'Exam Preparation and Tutoring','false')
       ,(6116,611692,'Automobile Driving Schools','false')
       ,(6116,611699,'All Other Miscellaneous Schools and Instruction','false')
       ,(6117,61171,'Educational Support Services','false')
       ,(6117,611710,'Educational Support Services','false')
       ,(6211,62111,'Offices of Physicians','false')
       ,(6211,621111,'Offices of Physicians (except Mental Health Specialists)','false')
       ,(6211,621112,'Offices of Physicians, Mental Health Specialists','false')
       ,(6212,62121,'Offices of Dentists','false')
       ,(6212,621210,'Offices of Dentists','false')
       ,(6213,62131,'Offices of Chiropractors','false')
       ,(6213,621310,'Offices of Chiropractors','false')
       ,(6213,62132,'Offices of Optometrists','false')
       ,(6213,621320,'Offices of Optometrists','false')
       ,(6213,62133,'Offices of Mental Health Practitioners (except Physicians)','false')
       ,(6213,621330,'Offices of Mental Health Practitioners (except Physicians)','false')
       ,(6213,62134,'Offices of Physical, Occupational and Speech Therapists, and Audiologists','false')
       ,(6213,621340,'Offices of Physical, Occupational and Speech Therapists, and Audiologists','false')
       ,(6213,62139,'Offices of All Other Health Practitioners','false')
       ,(6213,621391,'Offices of Podiatrists','false')
       ,(6213,621399,'Offices of All Other Miscellaneous Health Practitioners','false')
       ,(6214,62141,'Family Planning Centers','true')
       ,(6214,621410,'Family Planning Centers','true')
       ,(6214,62142,'Outpatient Mental Health and Substance Abuse Centers','false')
       ,(6214,621420,'Outpatient Mental Health and Substance Abuse Centers','false')
       ,(6214,62149,'Other Outpatient Care Centers','false')
       ,(6214,621491,'HMO Medical Centers','false')
       ,(6214,621492,'Kidney Dialysis Centers','false')
       ,(6214,621493,'Freestanding Ambulatory Surgical and Emergency Centers','false')
       ,(6214,621498,'All Other Outpatient Care Centers','false')
       ,(6215,62151,'Medical and Diagnostic Laboratories','false')
       ,(6215,621511,'Medical Laboratories','false')
       ,(6215,621512,'Diagnostic Imaging Centers','false')
       ,(6216,62161,'Home Health Care Services','false')
       ,(6216,621610,'Home Health Care Services','false')
       ,(6219,62191,'Ambulance Services','false')
       ,(6219,621910,'Ambulance Services','false')
       ,(6219,62199,'All Other Ambulatory Health Care Services','false')
       ,(6219,621991,'Blood and Organ Banks','true')
       ,(6219,621999,'All Other Miscellaneous Ambulatory Health Care Services','false')
       ,(6221,62211,'General Medical and Surgical Hospitals','false')
       ,(6221,622110,'General Medical and Surgical Hospitals','false')
       ,(6222,62221,'Psychiatric and Substance Abuse Hospitals','false')
       ,(6222,622210,'Psychiatric and Substance Abuse Hospitals','false')
       ,(6223,62231,'Specialty (except Psychiatric and Substance Abuse) Hospitals','false')
       ,(6223,622310,'Specialty (except Psychiatric and Substance Abuse) Hospitals','false')
       ,(6231,62311,'Nursing Care Facilities (Skilled Nursing Facilities)','false')
       ,(6231,623110,'Nursing Care Facilities (Skilled Nursing Facilities)','false')
       ,(6232,62321,'Residential Intellectual and Developmental Disability Facilities','false')
       ,(6232,623210,'Residential Intellectual and Developmental Disability Facilities','false')
       ,(6232,62322,'Residential Mental Health and Substance Abuse Facilities','false')
       ,(6232,623220,'Residential Mental Health and Substance Abuse Facilities','false')
       ,(6233,62331,'Continuing Care Retirement Communities and Assisted Living Facilities for the Elderly','false')
       ,(6233,623311,'Continuing Care Retirement Communities','false')
       ,(6233,623312,'Assisted Living Facilities for the Elderly','false')
       ,(6239,62399,'Other Residential Care Facilities','false')
       ,(6239,623990,'Other Residential Care Facilities','false')
       ,(6241,62411,'Child and Youth Services','false')
       ,(6241,624110,'Child and Youth Services','false')
       ,(6241,62412,'Services for the Elderly and Persons with Disabilities','false')
       ,(6241,624120,'Services for the Elderly and Persons with Disabilities','false')
       ,(6241,62419,'Other Individual and Family Services','false')
       ,(6241,624190,'Other Individual and Family Services','false')
       ,(6242,62421,'Community Food Services','false')
       ,(6242,624210,'Community Food Services','false')
       ,(6242,62422,'Community Housing Services','false')
       ,(6242,624221,'Temporary Shelters','false')
       ,(6242,624229,'Other Community Housing Services','false')
       ,(6242,62423,'Emergency and Other Relief Services','false')
       ,(6242,624230,'Emergency and Other Relief Services','false')
       ,(6243,62431,'Vocational Rehabilitation Services','false')
       ,(6243,624310,'Vocational Rehabilitation Services','false')
       ,(6244,62441,'Child Care Services','false')
       ,(6244,624410,'Child Care Services','false')
       ,(7111,71111,'Theater Companies and Dinner Theaters','true')
       ,(7111,711110,'Theater Companies and Dinner Theaters','true')
       ,(7111,71112,'Dance Companies','true')
       ,(7111,711120,'Dance Companies','true')
       ,(7111,71113,'Musical Groups and Artists','true')
       ,(7111,711130,'Musical Groups and Artists','true')
       ,(7111,71119,'Other Performing Arts Companies','true')
       ,(7111,711190,'Other Performing Arts Companies','true')
       ,(7112,71121,'Spectator Sports','false')
       ,(7112,711211,'Sports Teams and Clubs','false')
       ,(7112,711212,'Racetracks','false')
       ,(7112,711219,'Other Spectator Sports','false')
       ,(7113,71131,'Promoters of Performing Arts, Sports, and Similar Events with Facilities','true')
       ,(7113,711310,'Promoters of Performing Arts, Sports, and Similar Events with Facilities','true')
       ,(7113,71132,'Promoters of Performing Arts, Sports, and Similar Events without Facilities','true')
       ,(7113,711320,'Promoters of Performing Arts, Sports, and Similar Events without Facilities','true')
       ,(7114,71141,'Agents and Managers for Artists, Athletes, Entertainers, and Other Public Figures','true')
       ,(7114,711410,'Agents and Managers for Artists, Athletes, Entertainers, and Other Public Figures','true')
       ,(7115,71151,'Independent Artists, Writers, and Performers','true')
       ,(7115,711510,'Independent Artists, Writers, and Performers','true')
       ,(7121,71211,'Museums','false')
       ,(7121,712110,'Museums','false')
       ,(7121,71212,'Historical Sites','false')
       ,(7121,712120,'Historical Sites','false')
       ,(7121,71213,'Zoos and Botanical Gardens','true')
       ,(7121,712130,'Zoos and Botanical Gardens','true')
       ,(7121,71219,'Nature Parks and Other Similar Institutions','false')
       ,(7121,712190,'Nature Parks and Other Similar Institutions','false')
       ,(7131,71311,'Amusement and Theme Parks','false')
       ,(7131,713110,'Amusement and Theme Parks','false')
       ,(7131,71312,'Amusement Arcades','false')
       ,(7131,713120,'Amusement Arcades','false')
       ,(7132,71321,'Casinos (except Casino Hotels)','true')
       ,(7132,713210,'Casinos (except Casino Hotels)','true')
       ,(7132,71329,'Other Gambling Industries','true')
       ,(7132,713290,'Other Gambling Industries','true')
       ,(7139,71391,'Golf Courses and Country Clubs','false')
       ,(7139,713910,'Golf Courses and Country Clubs','false')
       ,(7139,71392,'Skiing Facilities','false')
       ,(7139,713920,'Skiing Facilities','false')
       ,(7139,71393,'Marinas','false')
       ,(7139,713930,'Marinas','false')
       ,(7139,71394,'Fitness and Recreational Sports Centers','true')
       ,(7139,713940,'Fitness and Recreational Sports Centers','true')
       ,(7139,71395,'Bowling Centers','false')
       ,(7139,713950,'Bowling Centers','false')
       ,(7139,71399,'All Other Amusement and Recreation Industries','false')
       ,(7139,713990,'All Other Amusement and Recreation Industries','false')
       ,(7211,72111,'Hotels (except Casino Hotels) and Motels','true')
       ,(7211,721110,'Hotels (except Casino Hotels) and Motels','true')
       ,(7211,72112,'Casino Hotels','true')
       ,(7211,721120,'Casino Hotels','true')
       ,(7211,72119,'Other Traveler Accommodation','false')
       ,(7211,721191,'Bed-and-Breakfast Inns','false')
       ,(7211,721199,'All Other Traveler Accommodation','false')
       ,(7212,72121,'RV (Recreational Vehicle) Parks and Recreational Camps','false')
       ,(7212,721211,'RV (Recreational Vehicle) Parks and Campgrounds','false')
       ,(7212,721214,'Recreational and Vacation Camps (except Campgrounds)','false')
       ,(7213,72131,'Rooming and Boarding Houses, Dormitories, and Workers'' Camps','false')
       ,(7213,721310,'Rooming and Boarding Houses, Dormitories, and Workers'' Camps','false')
       ,(7223,72231,'Food Service Contractors','false')
       ,(7223,722310,'Food Service Contractors','false')
       ,(7223,72232,'Caterers','false')
       ,(7223,722320,'Caterers','false')
       ,(7223,72233,'Mobile Food Services','false')
       ,(7223,722330,'Mobile Food Services','false')
       ,(7224,72241,'Drinking Places (Alcoholic Beverages)','true')
       ,(7224,722410,'Drinking Places (Alcoholic Beverages)','true')
       ,(7225,72251,'Restaurants and Other Eating Places','false')
       ,(7225,722511,'Full-Service Restaurants','false')
       ,(7225,722513,'Limited-Service Restaurants','false')
       ,(7225,722514,'Cafeterias, Grill Buffets, and Buffets','false')
       ,(7225,722515,'Snack and Nonalcoholic Beverage Bars','false')
       ,(8111,81111,'Automotive Mechanical and Electrical Repair and Maintenance','false')
       ,(8111,811111,'General Automotive Repair','false')
       ,(8111,811112,'Automotive Exhaust System Repair','false')
       ,(8111,811113,'Automotive Transmission Repair','false')
       ,(8111,811118,'Other Automotive Mechanical and Electrical Repair and Maintenance','false')
       ,(8111,81112,'Automotive Body, Paint, Interior, and Glass Repair','false')
       ,(8111,811121,'Automotive Body, Paint, and Interior Repair and Maintenance','false')
       ,(8111,811122,'Automotive Glass Replacement Shops','false')
       ,(8111,81119,'Other Automotive Repair and Maintenance','false')
       ,(8111,811191,'Automotive Oil Change and Lubrication Shops','false')
       ,(8111,811192,'Car Washes','false')
       ,(8111,811198,'All Other Automotive Repair and Maintenance','false')
       ,(8112,81121,'Electronic and Precision Equipment Repair and Maintenance','false')
       ,(8112,811210,'Electronic and Precision Equipment Repair and Maintenance','false')
       ,(8112,811211,'Consumer Electronics Repair and Maintenance','false')
       ,(8112,811212,'Computer and Office Machine Repair and Maintenance','false')
       ,(8112,811213,'Communication Equipment Repair and Maintenance','false')
       ,(8112,811219,'Other Electronic and Precision Equipment Repair and Maintenance','false')
       ,(8113,81131,'Commercial and Industrial Machinery and Equipment (except Automotive and Electronic) Repair and Maintenance','false')
       ,(8113,811310,'Commercial and Industrial Machinery and Equipment (except Automotive and Electronic) Repair and Maintenance','false')
       ,(8114,81141,'Home and Garden Equipment and Appliance Repair and Maintenance','false')
       ,(8114,811411,'Home and Garden Equipment Repair and Maintenance','false')
       ,(8114,811412,'Appliance Repair and Maintenance','false')
       ,(8114,81142,'Reupholstery and Furniture Repair','false')
       ,(8114,811420,'Reupholstery and Furniture Repair','false')
       ,(8114,81143,'Footwear and Leather Goods Repair','false')
       ,(8114,811430,'Footwear and Leather Goods Repair','false')
       ,(8114,81149,'Other Personal and Household Goods Repair and Maintenance','false')
       ,(8114,811490,'Other Personal and Household Goods Repair and Maintenance','false')
       ,(8121,81211,'Hair, Nail, and Skin Care Services','false')
       ,(8121,812111,'Barber Shops','false')
       ,(8121,812112,'Beauty Salons','false')
       ,(8121,812113,'Nail Salons','false')
       ,(8121,81219,'Other Personal Care Services','false')
       ,(8121,812191,'Diet and Weight Reducing Centers','false')
       ,(8121,812199,'Other Personal Care Services','false')
       ,(8122,81221,'Funeral Homes and Funeral Services','true')
       ,(8122,812210,'Funeral Homes and Funeral Services','true')
       ,(8122,81222,'Cemeteries and Crematories','true')
       ,(8122,812220,'Cemeteries and Crematories','true')
       ,(8123,81231,'Coin-Operated Laundries and Drycleaners','false')
       ,(8123,812310,'Coin-Operated Laundries and Drycleaners','false')
       ,(8123,81232,'Drycleaning and Laundry Services (except Coin-Operated)','false')
       ,(8123,812320,'Drycleaning and Laundry Services (except Coin-Operated)','false')
       ,(8123,81233,'Linen and Uniform Supply','false')
       ,(8123,812331,'Linen Supply','false')
       ,(8123,812332,'Industrial Launderers','false')
       ,(8129,81291,'Pet Care (except Veterinary) Services','true')
       ,(8129,812910,'Pet Care (except Veterinary) Services','true')
       ,(8129,81292,'Photofinishing','false')
       ,(8129,812921,'Photofinishing Laboratories (except One-Hour)','false')
       ,(8129,812922,'One-Hour Photofinishing','false')
       ,(8129,81293,'Parking Lots and Garages','false')
       ,(8129,812930,'Parking Lots and Garages','false')
       ,(8129,81299,'All Other Personal Services','true')
       ,(8129,812990,'All Other Personal Services','true')
       ,(8131,81311,'Religious Organizations','true')
       ,(8131,813110,'Religious Organizations','true')
       ,(8132,81321,'Grantmaking and Giving Services','false')
       ,(8132,813211,'Grantmaking Foundations','false')
       ,(8132,813212,'Voluntary Health Organizations','false')
       ,(8132,813219,'Other Grantmaking and Giving Services','false')
       ,(8133,81331,'Social Advocacy Organizations','true')
       ,(8133,813311,'Human Rights Organizations','true')
       ,(8133,813312,'Environment, Conservation and Wildlife Organizations','true')
       ,(8133,813319,'Other Social Advocacy Organizations','true')
       ,(8134,81341,'Civic and Social Organizations','true')
       ,(8134,813410,'Civic and Social Organizations','true')
       ,(8139,81391,'Business Associations','false')
       ,(8139,813910,'Business Associations','false')
       ,(8139,81392,'Professional Organizations','false')
       ,(8139,813920,'Professional Organizations','false')
       ,(8139,81393,'Labor Unions and Similar Labor Organizations','false')
       ,(8139,813930,'Labor Unions and Similar Labor Organizations','false')
       ,(8139,81394,'Political Organizations','false')
       ,(8139,813940,'Political Organizations','false')
       ,(8139,81399,'Other Similar Organizations (except Business, Professional, Labor, and Political Organizations)','false')
       ,(8139,813990,'Other Similar Organizations (except Business, Professional, Labor, and Political Organizations)','false')
       ,(8141,81411,'Private Households','false')
       ,(8141,814110,'Private Households','false')
       ,(9211,92111,'Executive Offices','true')
       ,(9211,921110,'Executive Offices','true')
       ,(9211,92112,'Legislative Bodies','true')
       ,(9211,921120,'Legislative Bodies','true')
       ,(9211,92113,'Public Finance Activities','true')
       ,(9211,921130,'Public Finance Activities','true')
       ,(9211,92114,'Executive and Legislative Offices, Combined','true')
       ,(9211,921140,'Executive and Legislative Offices, Combined','true')
       ,(9211,92115,'American Indian and Alaska Native Tribal Governments','true')
       ,(9211,921150,'American Indian and Alaska Native Tribal Governments','true')
       ,(9211,92119,'Other General Government Support','true')
       ,(9211,921190,'Other General Government Support','true')
       ,(9221,92211,'Courts','true')
       ,(9221,922110,'Courts','true')
       ,(9221,92212,'Police Protection','true')
       ,(9221,922120,'Police Protection','true')
       ,(9221,92213,'Legal Counsel and Prosecution','true')
       ,(9221,922130,'Legal Counsel and Prosecution','true')
       ,(9221,92214,'Correctional Institutions','true')
       ,(9221,922140,'Correctional Institutions','true')
       ,(9221,92215,'Parole Offices and Probation Offices','true')
       ,(9221,922150,'Parole Offices and Probation Offices','true')
       ,(9221,92216,'Fire Protection','true')
       ,(9221,922160,'Fire Protection','true')
       ,(9221,92219,'Other Justice, Public Order, and Safety Activities','true')
       ,(9221,922190,'Other Justice, Public Order, and Safety Activities','true')
       ,(9231,92311,'Administration of Education Programs','true')
       ,(9231,923110,'Administration of Education Programs','true')
       ,(9231,92312,'Administration of Public Health Programs','true')
       ,(9231,923120,'Administration of Public Health Programs','true')
       ,(9231,92313,'Administration of Human Resource Programs (except Education, Public Health, and Veterans'' Affairs Programs)','true')
       ,(9231,923130,'Administration of Human Resource Programs (except Education, Public Health, and Veterans'' Affairs Programs)','true')
       ,(9231,92314,'Administration of Veterans'' Affairs','true')
       ,(9231,923140,'Administration of Veterans'' Affairs','true')
       ,(9241,92411,'Administration of Air and Water Resource and Solid Waste Management Programs','true')
       ,(9241,924110,'Administration of Air and Water Resource and Solid Waste Management Programs','true')
       ,(9241,92412,'Administration of Conservation Programs','true')
       ,(9241,924120,'Administration of Conservation Programs','true')
       ,(9251,92511,'Administration of Housing Programs','true')
       ,(9251,925110,'Administration of Housing Programs','true')
       ,(9251,92512,'Administration of Urban Planning and Community and Rural Development','true')
       ,(9251,925120,'Administration of Urban Planning and Community and Rural Development','true')
       ,(9261,92611,'Administration of General Economic Programs','true')
       ,(9261,926110,'Administration of General Economic Programs','true')
       ,(9261,92612,'Regulation and Administration of Transportation Programs','true')
       ,(9261,926120,'Regulation and Administration of Transportation Programs','true')
       ,(9261,92613,'Regulation and Administration of Communications, Electric, Gas, and Other Utilities','true')
       ,(9261,926130,'Regulation and Administration of Communications, Electric, Gas, and Other Utilities','true')
       ,(9261,92614,'Regulation of Agricultural Marketing and Commodities','true')
       ,(9261,926140,'Regulation of Agricultural Marketing and Commodities','true')
       ,(9261,92615,'Regulation, Licensing, and Inspection of Miscellaneous Commercial Sectors','true')
       ,(9261,926150,'Regulation, Licensing, and Inspection of Miscellaneous Commercial Sectors','true')
       ,(9271,92711,'Space Research and Technology','true')
       ,(9271,927110,'Space Research and Technology','true')
       ,(9281,92811,'National Security','true')
       ,(9281,928110,'National Security','true')
       ,(9281,92812,'International Affairs','true')
       ,(9281,928120,'International Affairs','true');`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
DELETE FROM business_subsectors WHERE id= 11111;
DELETE FROM business_subsectors WHERE id= 111110;
DELETE FROM business_subsectors WHERE id= 11112;
DELETE FROM business_subsectors WHERE id= 111120;
DELETE FROM business_subsectors WHERE id= 11113;
DELETE FROM business_subsectors WHERE id= 111130;
DELETE FROM business_subsectors WHERE id= 11114;
DELETE FROM business_subsectors WHERE id= 111140;
DELETE FROM business_subsectors WHERE id= 11115;
DELETE FROM business_subsectors WHERE id= 111150;
DELETE FROM business_subsectors WHERE id= 11116;
DELETE FROM business_subsectors WHERE id= 111160;
DELETE FROM business_subsectors WHERE id= 11119;
DELETE FROM business_subsectors WHERE id= 111191;
DELETE FROM business_subsectors WHERE id= 111199;
DELETE FROM business_subsectors WHERE id= 11121;
DELETE FROM business_subsectors WHERE id= 111211;
DELETE FROM business_subsectors WHERE id= 111219;
DELETE FROM business_subsectors WHERE id= 11131;
DELETE FROM business_subsectors WHERE id= 111310;
DELETE FROM business_subsectors WHERE id= 11132;
DELETE FROM business_subsectors WHERE id= 111320;
DELETE FROM business_subsectors WHERE id= 11133;
DELETE FROM business_subsectors WHERE id= 111331;
DELETE FROM business_subsectors WHERE id= 111332;
DELETE FROM business_subsectors WHERE id= 111333;
DELETE FROM business_subsectors WHERE id= 111334;
DELETE FROM business_subsectors WHERE id= 111335;
DELETE FROM business_subsectors WHERE id= 111336;
DELETE FROM business_subsectors WHERE id= 111339;
DELETE FROM business_subsectors WHERE id= 11141;
DELETE FROM business_subsectors WHERE id= 111411;
DELETE FROM business_subsectors WHERE id= 111419;
DELETE FROM business_subsectors WHERE id= 11142;
DELETE FROM business_subsectors WHERE id= 111421;
DELETE FROM business_subsectors WHERE id= 111422;
DELETE FROM business_subsectors WHERE id= 11191;
DELETE FROM business_subsectors WHERE id= 111910;
DELETE FROM business_subsectors WHERE id= 11192;
DELETE FROM business_subsectors WHERE id= 111920;
DELETE FROM business_subsectors WHERE id= 11193;
DELETE FROM business_subsectors WHERE id= 111930;
DELETE FROM business_subsectors WHERE id= 11194;
DELETE FROM business_subsectors WHERE id= 111940;
DELETE FROM business_subsectors WHERE id= 11199;
DELETE FROM business_subsectors WHERE id= 111991;
DELETE FROM business_subsectors WHERE id= 111992;
DELETE FROM business_subsectors WHERE id= 111998;
DELETE FROM business_subsectors WHERE id= 11211;
DELETE FROM business_subsectors WHERE id= 112111;
DELETE FROM business_subsectors WHERE id= 112112;
DELETE FROM business_subsectors WHERE id= 11212;
DELETE FROM business_subsectors WHERE id= 112120;
DELETE FROM business_subsectors WHERE id= 11213;
DELETE FROM business_subsectors WHERE id= 112130;
DELETE FROM business_subsectors WHERE id= 11221;
DELETE FROM business_subsectors WHERE id= 112210;
DELETE FROM business_subsectors WHERE id= 11231;
DELETE FROM business_subsectors WHERE id= 112310;
DELETE FROM business_subsectors WHERE id= 11232;
DELETE FROM business_subsectors WHERE id= 112320;
DELETE FROM business_subsectors WHERE id= 11233;
DELETE FROM business_subsectors WHERE id= 112330;
DELETE FROM business_subsectors WHERE id= 11234;
DELETE FROM business_subsectors WHERE id= 112340;
DELETE FROM business_subsectors WHERE id= 11239;
DELETE FROM business_subsectors WHERE id= 112390;
DELETE FROM business_subsectors WHERE id= 11241;
DELETE FROM business_subsectors WHERE id= 112410;
DELETE FROM business_subsectors WHERE id= 11242;
DELETE FROM business_subsectors WHERE id= 112420;
DELETE FROM business_subsectors WHERE id= 11251;
DELETE FROM business_subsectors WHERE id= 112511;
DELETE FROM business_subsectors WHERE id= 112512;
DELETE FROM business_subsectors WHERE id= 112519;
DELETE FROM business_subsectors WHERE id= 11291;
DELETE FROM business_subsectors WHERE id= 112910;
DELETE FROM business_subsectors WHERE id= 11292;
DELETE FROM business_subsectors WHERE id= 112920;
DELETE FROM business_subsectors WHERE id= 11293;
DELETE FROM business_subsectors WHERE id= 112930;
DELETE FROM business_subsectors WHERE id= 11299;
DELETE FROM business_subsectors WHERE id= 112990;
DELETE FROM business_subsectors WHERE id= 11311;
DELETE FROM business_subsectors WHERE id= 113110;
DELETE FROM business_subsectors WHERE id= 11321;
DELETE FROM business_subsectors WHERE id= 113210;
DELETE FROM business_subsectors WHERE id= 11331;
DELETE FROM business_subsectors WHERE id= 113310;
DELETE FROM business_subsectors WHERE id= 11411;
DELETE FROM business_subsectors WHERE id= 114111;
DELETE FROM business_subsectors WHERE id= 114112;
DELETE FROM business_subsectors WHERE id= 114119;
DELETE FROM business_subsectors WHERE id= 11421;
DELETE FROM business_subsectors WHERE id= 114210;
DELETE FROM business_subsectors WHERE id= 11511;
DELETE FROM business_subsectors WHERE id= 115111;
DELETE FROM business_subsectors WHERE id= 115112;
DELETE FROM business_subsectors WHERE id= 115113;
DELETE FROM business_subsectors WHERE id= 115114;
DELETE FROM business_subsectors WHERE id= 115115;
DELETE FROM business_subsectors WHERE id= 115116;
DELETE FROM business_subsectors WHERE id= 11521;
DELETE FROM business_subsectors WHERE id= 115210;
DELETE FROM business_subsectors WHERE id= 11531;
DELETE FROM business_subsectors WHERE id= 115310;
DELETE FROM business_subsectors WHERE id= 21112;
DELETE FROM business_subsectors WHERE id= 211120;
DELETE FROM business_subsectors WHERE id= 21113;
DELETE FROM business_subsectors WHERE id= 211130;
DELETE FROM business_subsectors WHERE id= 21211;
DELETE FROM business_subsectors WHERE id= 212111;
DELETE FROM business_subsectors WHERE id= 212112;
DELETE FROM business_subsectors WHERE id= 212113;
DELETE FROM business_subsectors WHERE id= 212114;
DELETE FROM business_subsectors WHERE id= 212115;
DELETE FROM business_subsectors WHERE id= 21221;
DELETE FROM business_subsectors WHERE id= 212210;
DELETE FROM business_subsectors WHERE id= 21222;
DELETE FROM business_subsectors WHERE id= 212220;
DELETE FROM business_subsectors WHERE id= 212221;
DELETE FROM business_subsectors WHERE id= 212222;
DELETE FROM business_subsectors WHERE id= 21223;
DELETE FROM business_subsectors WHERE id= 212230;
DELETE FROM business_subsectors WHERE id= 21229;
DELETE FROM business_subsectors WHERE id= 212290;
DELETE FROM business_subsectors WHERE id= 212291;
DELETE FROM business_subsectors WHERE id= 212299;
DELETE FROM business_subsectors WHERE id= 21231;
DELETE FROM business_subsectors WHERE id= 212311;
DELETE FROM business_subsectors WHERE id= 212312;
DELETE FROM business_subsectors WHERE id= 212313;
DELETE FROM business_subsectors WHERE id= 212319;
DELETE FROM business_subsectors WHERE id= 21232;
DELETE FROM business_subsectors WHERE id= 212321;
DELETE FROM business_subsectors WHERE id= 212322;
DELETE FROM business_subsectors WHERE id= 212323;
DELETE FROM business_subsectors WHERE id= 212324;
DELETE FROM business_subsectors WHERE id= 212325;
DELETE FROM business_subsectors WHERE id= 21239;
DELETE FROM business_subsectors WHERE id= 212390;
DELETE FROM business_subsectors WHERE id= 212391;
DELETE FROM business_subsectors WHERE id= 212392;
DELETE FROM business_subsectors WHERE id= 212393;
DELETE FROM business_subsectors WHERE id= 212399;
DELETE FROM business_subsectors WHERE id= 21311;
DELETE FROM business_subsectors WHERE id= 213111;
DELETE FROM business_subsectors WHERE id= 213112;
DELETE FROM business_subsectors WHERE id= 213113;
DELETE FROM business_subsectors WHERE id= 213114;
DELETE FROM business_subsectors WHERE id= 213115;
DELETE FROM business_subsectors WHERE id= 22111;
DELETE FROM business_subsectors WHERE id= 221111;
DELETE FROM business_subsectors WHERE id= 221112;
DELETE FROM business_subsectors WHERE id= 221113;
DELETE FROM business_subsectors WHERE id= 221114;
DELETE FROM business_subsectors WHERE id= 221115;
DELETE FROM business_subsectors WHERE id= 221116;
DELETE FROM business_subsectors WHERE id= 221117;
DELETE FROM business_subsectors WHERE id= 221118;
DELETE FROM business_subsectors WHERE id= 22112;
DELETE FROM business_subsectors WHERE id= 221121;
DELETE FROM business_subsectors WHERE id= 221122;
DELETE FROM business_subsectors WHERE id= 22121;
DELETE FROM business_subsectors WHERE id= 221210;
DELETE FROM business_subsectors WHERE id= 22131;
DELETE FROM business_subsectors WHERE id= 221310;
DELETE FROM business_subsectors WHERE id= 22132;
DELETE FROM business_subsectors WHERE id= 221320;
DELETE FROM business_subsectors WHERE id= 22133;
DELETE FROM business_subsectors WHERE id= 221330;
DELETE FROM business_subsectors WHERE id= 23611;
DELETE FROM business_subsectors WHERE id= 236115;
DELETE FROM business_subsectors WHERE id= 236116;
DELETE FROM business_subsectors WHERE id= 236117;
DELETE FROM business_subsectors WHERE id= 236118;
DELETE FROM business_subsectors WHERE id= 23621;
DELETE FROM business_subsectors WHERE id= 236210;
DELETE FROM business_subsectors WHERE id= 23622;
DELETE FROM business_subsectors WHERE id= 236220;
DELETE FROM business_subsectors WHERE id= 23711;
DELETE FROM business_subsectors WHERE id= 237110;
DELETE FROM business_subsectors WHERE id= 23712;
DELETE FROM business_subsectors WHERE id= 237120;
DELETE FROM business_subsectors WHERE id= 23713;
DELETE FROM business_subsectors WHERE id= 237130;
DELETE FROM business_subsectors WHERE id= 23721;
DELETE FROM business_subsectors WHERE id= 237210;
DELETE FROM business_subsectors WHERE id= 23731;
DELETE FROM business_subsectors WHERE id= 237310;
DELETE FROM business_subsectors WHERE id= 23799;
DELETE FROM business_subsectors WHERE id= 237990;
DELETE FROM business_subsectors WHERE id= 23811;
DELETE FROM business_subsectors WHERE id= 238110;
DELETE FROM business_subsectors WHERE id= 23812;
DELETE FROM business_subsectors WHERE id= 238120;
DELETE FROM business_subsectors WHERE id= 23813;
DELETE FROM business_subsectors WHERE id= 238130;
DELETE FROM business_subsectors WHERE id= 23814;
DELETE FROM business_subsectors WHERE id= 238140;
DELETE FROM business_subsectors WHERE id= 23815;
DELETE FROM business_subsectors WHERE id= 238150;
DELETE FROM business_subsectors WHERE id= 23816;
DELETE FROM business_subsectors WHERE id= 238160;
DELETE FROM business_subsectors WHERE id= 23817;
DELETE FROM business_subsectors WHERE id= 238170;
DELETE FROM business_subsectors WHERE id= 23819;
DELETE FROM business_subsectors WHERE id= 238190;
DELETE FROM business_subsectors WHERE id= 23821;
DELETE FROM business_subsectors WHERE id= 238210;
DELETE FROM business_subsectors WHERE id= 23822;
DELETE FROM business_subsectors WHERE id= 238220;
DELETE FROM business_subsectors WHERE id= 23829;
DELETE FROM business_subsectors WHERE id= 238290;
DELETE FROM business_subsectors WHERE id= 23831;
DELETE FROM business_subsectors WHERE id= 238310;
DELETE FROM business_subsectors WHERE id= 23832;
DELETE FROM business_subsectors WHERE id= 238320;
DELETE FROM business_subsectors WHERE id= 23833;
DELETE FROM business_subsectors WHERE id= 238330;
DELETE FROM business_subsectors WHERE id= 23834;
DELETE FROM business_subsectors WHERE id= 238340;
DELETE FROM business_subsectors WHERE id= 23835;
DELETE FROM business_subsectors WHERE id= 238350;
DELETE FROM business_subsectors WHERE id= 23839;
DELETE FROM business_subsectors WHERE id= 238390;
DELETE FROM business_subsectors WHERE id= 23891;
DELETE FROM business_subsectors WHERE id= 238910;
DELETE FROM business_subsectors WHERE id= 23899;
DELETE FROM business_subsectors WHERE id= 238990;
DELETE FROM business_subsectors WHERE id= 31111;
DELETE FROM business_subsectors WHERE id= 311111;
DELETE FROM business_subsectors WHERE id= 311119;
DELETE FROM business_subsectors WHERE id= 31121;
DELETE FROM business_subsectors WHERE id= 311211;
DELETE FROM business_subsectors WHERE id= 311212;
DELETE FROM business_subsectors WHERE id= 311213;
DELETE FROM business_subsectors WHERE id= 31122;
DELETE FROM business_subsectors WHERE id= 311221;
DELETE FROM business_subsectors WHERE id= 311224;
DELETE FROM business_subsectors WHERE id= 311225;
DELETE FROM business_subsectors WHERE id= 31123;
DELETE FROM business_subsectors WHERE id= 311230;
DELETE FROM business_subsectors WHERE id= 31131;
DELETE FROM business_subsectors WHERE id= 311313;
DELETE FROM business_subsectors WHERE id= 311314;
DELETE FROM business_subsectors WHERE id= 31134;
DELETE FROM business_subsectors WHERE id= 311340;
DELETE FROM business_subsectors WHERE id= 31135;
DELETE FROM business_subsectors WHERE id= 311351;
DELETE FROM business_subsectors WHERE id= 311352;
DELETE FROM business_subsectors WHERE id= 31141;
DELETE FROM business_subsectors WHERE id= 311411;
DELETE FROM business_subsectors WHERE id= 311412;
DELETE FROM business_subsectors WHERE id= 31142;
DELETE FROM business_subsectors WHERE id= 311421;
DELETE FROM business_subsectors WHERE id= 311422;
DELETE FROM business_subsectors WHERE id= 311423;
DELETE FROM business_subsectors WHERE id= 31151;
DELETE FROM business_subsectors WHERE id= 311511;
DELETE FROM business_subsectors WHERE id= 311512;
DELETE FROM business_subsectors WHERE id= 311513;
DELETE FROM business_subsectors WHERE id= 311514;
DELETE FROM business_subsectors WHERE id= 31152;
DELETE FROM business_subsectors WHERE id= 311520;
DELETE FROM business_subsectors WHERE id= 31161;
DELETE FROM business_subsectors WHERE id= 311611;
DELETE FROM business_subsectors WHERE id= 311612;
DELETE FROM business_subsectors WHERE id= 311613;
DELETE FROM business_subsectors WHERE id= 311615;
DELETE FROM business_subsectors WHERE id= 31171;
DELETE FROM business_subsectors WHERE id= 311710;
DELETE FROM business_subsectors WHERE id= 31181;
DELETE FROM business_subsectors WHERE id= 311811;
DELETE FROM business_subsectors WHERE id= 311812;
DELETE FROM business_subsectors WHERE id= 311813;
DELETE FROM business_subsectors WHERE id= 31182;
DELETE FROM business_subsectors WHERE id= 311821;
DELETE FROM business_subsectors WHERE id= 311824;
DELETE FROM business_subsectors WHERE id= 31183;
DELETE FROM business_subsectors WHERE id= 311830;
DELETE FROM business_subsectors WHERE id= 31191;
DELETE FROM business_subsectors WHERE id= 311911;
DELETE FROM business_subsectors WHERE id= 311919;
DELETE FROM business_subsectors WHERE id= 31192;
DELETE FROM business_subsectors WHERE id= 311920;
DELETE FROM business_subsectors WHERE id= 31193;
DELETE FROM business_subsectors WHERE id= 311930;
DELETE FROM business_subsectors WHERE id= 31194;
DELETE FROM business_subsectors WHERE id= 311941;
DELETE FROM business_subsectors WHERE id= 311942;
DELETE FROM business_subsectors WHERE id= 31199;
DELETE FROM business_subsectors WHERE id= 311991;
DELETE FROM business_subsectors WHERE id= 311999;
DELETE FROM business_subsectors WHERE id= 31211;
DELETE FROM business_subsectors WHERE id= 312111;
DELETE FROM business_subsectors WHERE id= 312112;
DELETE FROM business_subsectors WHERE id= 312113;
DELETE FROM business_subsectors WHERE id= 31212;
DELETE FROM business_subsectors WHERE id= 312120;
DELETE FROM business_subsectors WHERE id= 31213;
DELETE FROM business_subsectors WHERE id= 312130;
DELETE FROM business_subsectors WHERE id= 31214;
DELETE FROM business_subsectors WHERE id= 312140;
DELETE FROM business_subsectors WHERE id= 31223;
DELETE FROM business_subsectors WHERE id= 312230;
DELETE FROM business_subsectors WHERE id= 31311;
DELETE FROM business_subsectors WHERE id= 313110;
DELETE FROM business_subsectors WHERE id= 31321;
DELETE FROM business_subsectors WHERE id= 313210;
DELETE FROM business_subsectors WHERE id= 31322;
DELETE FROM business_subsectors WHERE id= 313220;
DELETE FROM business_subsectors WHERE id= 31323;
DELETE FROM business_subsectors WHERE id= 313230;
DELETE FROM business_subsectors WHERE id= 31324;
DELETE FROM business_subsectors WHERE id= 313240;
DELETE FROM business_subsectors WHERE id= 31331;
DELETE FROM business_subsectors WHERE id= 313310;
DELETE FROM business_subsectors WHERE id= 31332;
DELETE FROM business_subsectors WHERE id= 313320;
DELETE FROM business_subsectors WHERE id= 31411;
DELETE FROM business_subsectors WHERE id= 314110;
DELETE FROM business_subsectors WHERE id= 31412;
DELETE FROM business_subsectors WHERE id= 314120;
DELETE FROM business_subsectors WHERE id= 31491;
DELETE FROM business_subsectors WHERE id= 314910;
DELETE FROM business_subsectors WHERE id= 31499;
DELETE FROM business_subsectors WHERE id= 314994;
DELETE FROM business_subsectors WHERE id= 314999;
DELETE FROM business_subsectors WHERE id= 31511;
DELETE FROM business_subsectors WHERE id= 315110;
DELETE FROM business_subsectors WHERE id= 31512;
DELETE FROM business_subsectors WHERE id= 315120;
DELETE FROM business_subsectors WHERE id= 31519;
DELETE FROM business_subsectors WHERE id= 315190;
DELETE FROM business_subsectors WHERE id= 31521;
DELETE FROM business_subsectors WHERE id= 315210;
DELETE FROM business_subsectors WHERE id= 31525;
DELETE FROM business_subsectors WHERE id= 315250;
DELETE FROM business_subsectors WHERE id= 31522;
DELETE FROM business_subsectors WHERE id= 315220;
DELETE FROM business_subsectors WHERE id= 31524;
DELETE FROM business_subsectors WHERE id= 315240;
DELETE FROM business_subsectors WHERE id= 31528;
DELETE FROM business_subsectors WHERE id= 315280;
DELETE FROM business_subsectors WHERE id= 31599;
DELETE FROM business_subsectors WHERE id= 315990;
DELETE FROM business_subsectors WHERE id= 31611;
DELETE FROM business_subsectors WHERE id= 316110;
DELETE FROM business_subsectors WHERE id= 31621;
DELETE FROM business_subsectors WHERE id= 316210;
DELETE FROM business_subsectors WHERE id= 31699;
DELETE FROM business_subsectors WHERE id= 316990;
DELETE FROM business_subsectors WHERE id= 316992;
DELETE FROM business_subsectors WHERE id= 316998;
DELETE FROM business_subsectors WHERE id= 32111;
DELETE FROM business_subsectors WHERE id= 321113;
DELETE FROM business_subsectors WHERE id= 321114;
DELETE FROM business_subsectors WHERE id= 32121;
DELETE FROM business_subsectors WHERE id= 321211;
DELETE FROM business_subsectors WHERE id= 321212;
DELETE FROM business_subsectors WHERE id= 321213;
DELETE FROM business_subsectors WHERE id= 321214;
DELETE FROM business_subsectors WHERE id= 321215;
DELETE FROM business_subsectors WHERE id= 321219;
DELETE FROM business_subsectors WHERE id= 3219;
DELETE FROM business_subsectors WHERE id= 321911;
DELETE FROM business_subsectors WHERE id= 321912;
DELETE FROM business_subsectors WHERE id= 321918;
DELETE FROM business_subsectors WHERE id= 32192;
DELETE FROM business_subsectors WHERE id= 321920;
DELETE FROM business_subsectors WHERE id= 32199;
DELETE FROM business_subsectors WHERE id= 321991;
DELETE FROM business_subsectors WHERE id= 321992;
DELETE FROM business_subsectors WHERE id= 321999;
DELETE FROM business_subsectors WHERE id= 322;
DELETE FROM business_subsectors WHERE id= 322110;
DELETE FROM business_subsectors WHERE id= 32212;
DELETE FROM business_subsectors WHERE id= 322120;
DELETE FROM business_subsectors WHERE id= 322121;
DELETE FROM business_subsectors WHERE id= 322122;
DELETE FROM business_subsectors WHERE id= 32213;
DELETE FROM business_subsectors WHERE id= 322130;
DELETE FROM business_subsectors WHERE id= 32221;
DELETE FROM business_subsectors WHERE id= 322211;
DELETE FROM business_subsectors WHERE id= 322212;
DELETE FROM business_subsectors WHERE id= 322219;
DELETE FROM business_subsectors WHERE id= 32222;
DELETE FROM business_subsectors WHERE id= 322220;
DELETE FROM business_subsectors WHERE id= 32223;
DELETE FROM business_subsectors WHERE id= 322230;
DELETE FROM business_subsectors WHERE id= 32229;
DELETE FROM business_subsectors WHERE id= 322291;
DELETE FROM business_subsectors WHERE id= 322299;
DELETE FROM business_subsectors WHERE id= 32311;
DELETE FROM business_subsectors WHERE id= 323111;
DELETE FROM business_subsectors WHERE id= 323113;
DELETE FROM business_subsectors WHERE id= 323117;
DELETE FROM business_subsectors WHERE id= 32312;
DELETE FROM business_subsectors WHERE id= 323120;
DELETE FROM business_subsectors WHERE id= 32411;
DELETE FROM business_subsectors WHERE id= 324110;
DELETE FROM business_subsectors WHERE id= 32412;
DELETE FROM business_subsectors WHERE id= 324121;
DELETE FROM business_subsectors WHERE id= 324122;
DELETE FROM business_subsectors WHERE id= 32419;
DELETE FROM business_subsectors WHERE id= 324191;
DELETE FROM business_subsectors WHERE id= 324199;
DELETE FROM business_subsectors WHERE id= 32511;
DELETE FROM business_subsectors WHERE id= 325110;
DELETE FROM business_subsectors WHERE id= 32512;
DELETE FROM business_subsectors WHERE id= 325120;
DELETE FROM business_subsectors WHERE id= 32513;
DELETE FROM business_subsectors WHERE id= 325130;
DELETE FROM business_subsectors WHERE id= 32518;
DELETE FROM business_subsectors WHERE id= 325180;
DELETE FROM business_subsectors WHERE id= 32519;
DELETE FROM business_subsectors WHERE id= 325193;
DELETE FROM business_subsectors WHERE id= 325194;
DELETE FROM business_subsectors WHERE id= 325199;
DELETE FROM business_subsectors WHERE id= 32521;
DELETE FROM business_subsectors WHERE id= 325211;
DELETE FROM business_subsectors WHERE id= 325212;
DELETE FROM business_subsectors WHERE id= 32522;
DELETE FROM business_subsectors WHERE id= 325220;
DELETE FROM business_subsectors WHERE id= 32531;
DELETE FROM business_subsectors WHERE id= 325311;
DELETE FROM business_subsectors WHERE id= 325312;
DELETE FROM business_subsectors WHERE id= 325314;
DELETE FROM business_subsectors WHERE id= 325315;
DELETE FROM business_subsectors WHERE id= 32532;
DELETE FROM business_subsectors WHERE id= 325320;
DELETE FROM business_subsectors WHERE id= 32541;
DELETE FROM business_subsectors WHERE id= 325411;
DELETE FROM business_subsectors WHERE id= 325412;
DELETE FROM business_subsectors WHERE id= 325413;
DELETE FROM business_subsectors WHERE id= 325414;
DELETE FROM business_subsectors WHERE id= 32551;
DELETE FROM business_subsectors WHERE id= 325510;
DELETE FROM business_subsectors WHERE id= 32552;
DELETE FROM business_subsectors WHERE id= 325520;
DELETE FROM business_subsectors WHERE id= 32561;
DELETE FROM business_subsectors WHERE id= 325611;
DELETE FROM business_subsectors WHERE id= 325612;
DELETE FROM business_subsectors WHERE id= 325613;
DELETE FROM business_subsectors WHERE id= 32562;
DELETE FROM business_subsectors WHERE id= 325620;
DELETE FROM business_subsectors WHERE id= 32591;
DELETE FROM business_subsectors WHERE id= 325910;
DELETE FROM business_subsectors WHERE id= 32592;
DELETE FROM business_subsectors WHERE id= 325920;
DELETE FROM business_subsectors WHERE id= 32599;
DELETE FROM business_subsectors WHERE id= 325991;
DELETE FROM business_subsectors WHERE id= 325992;
DELETE FROM business_subsectors WHERE id= 325998;
DELETE FROM business_subsectors WHERE id= 32611;
DELETE FROM business_subsectors WHERE id= 326111;
DELETE FROM business_subsectors WHERE id= 326112;
DELETE FROM business_subsectors WHERE id= 326113;
DELETE FROM business_subsectors WHERE id= 32612;
DELETE FROM business_subsectors WHERE id= 326121;
DELETE FROM business_subsectors WHERE id= 326122;
DELETE FROM business_subsectors WHERE id= 32613;
DELETE FROM business_subsectors WHERE id= 326130;
DELETE FROM business_subsectors WHERE id= 32614;
DELETE FROM business_subsectors WHERE id= 326140;
DELETE FROM business_subsectors WHERE id= 32615;
DELETE FROM business_subsectors WHERE id= 326150;
DELETE FROM business_subsectors WHERE id= 32616;
DELETE FROM business_subsectors WHERE id= 326160;
DELETE FROM business_subsectors WHERE id= 32619;
DELETE FROM business_subsectors WHERE id= 326191;
DELETE FROM business_subsectors WHERE id= 326199;
DELETE FROM business_subsectors WHERE id= 32621;
DELETE FROM business_subsectors WHERE id= 326211;
DELETE FROM business_subsectors WHERE id= 326212;
DELETE FROM business_subsectors WHERE id= 32622;
DELETE FROM business_subsectors WHERE id= 326220;
DELETE FROM business_subsectors WHERE id= 32629;
DELETE FROM business_subsectors WHERE id= 326291;
DELETE FROM business_subsectors WHERE id= 326299;
DELETE FROM business_subsectors WHERE id= 32711;
DELETE FROM business_subsectors WHERE id= 327110;
DELETE FROM business_subsectors WHERE id= 32712;
DELETE FROM business_subsectors WHERE id= 327120;
DELETE FROM business_subsectors WHERE id= 32721;
DELETE FROM business_subsectors WHERE id= 327211;
DELETE FROM business_subsectors WHERE id= 327212;
DELETE FROM business_subsectors WHERE id= 327213;
DELETE FROM business_subsectors WHERE id= 327215;
DELETE FROM business_subsectors WHERE id= 32731;
DELETE FROM business_subsectors WHERE id= 327310;
DELETE FROM business_subsectors WHERE id= 32732;
DELETE FROM business_subsectors WHERE id= 327320;
DELETE FROM business_subsectors WHERE id= 32733;
DELETE FROM business_subsectors WHERE id= 327331;
DELETE FROM business_subsectors WHERE id= 327332;
DELETE FROM business_subsectors WHERE id= 32739;
DELETE FROM business_subsectors WHERE id= 327390;
DELETE FROM business_subsectors WHERE id= 32741;
DELETE FROM business_subsectors WHERE id= 327410;
DELETE FROM business_subsectors WHERE id= 32742;
DELETE FROM business_subsectors WHERE id= 327420;
DELETE FROM business_subsectors WHERE id= 32791;
DELETE FROM business_subsectors WHERE id= 327910;
DELETE FROM business_subsectors WHERE id= 32799;
DELETE FROM business_subsectors WHERE id= 327991;
DELETE FROM business_subsectors WHERE id= 327992;
DELETE FROM business_subsectors WHERE id= 327993;
DELETE FROM business_subsectors WHERE id= 327999;
DELETE FROM business_subsectors WHERE id= 33111;
DELETE FROM business_subsectors WHERE id= 331110;
DELETE FROM business_subsectors WHERE id= 33121;
DELETE FROM business_subsectors WHERE id= 331210;
DELETE FROM business_subsectors WHERE id= 33122;
DELETE FROM business_subsectors WHERE id= 331221;
DELETE FROM business_subsectors WHERE id= 331222;
DELETE FROM business_subsectors WHERE id= 33131;
DELETE FROM business_subsectors WHERE id= 331313;
DELETE FROM business_subsectors WHERE id= 331314;
DELETE FROM business_subsectors WHERE id= 331315;
DELETE FROM business_subsectors WHERE id= 331318;
DELETE FROM business_subsectors WHERE id= 33141;
DELETE FROM business_subsectors WHERE id= 331410;
DELETE FROM business_subsectors WHERE id= 33142;
DELETE FROM business_subsectors WHERE id= 331420;
DELETE FROM business_subsectors WHERE id= 33149;
DELETE FROM business_subsectors WHERE id= 331491;
DELETE FROM business_subsectors WHERE id= 331492;
DELETE FROM business_subsectors WHERE id= 33151;
DELETE FROM business_subsectors WHERE id= 331511;
DELETE FROM business_subsectors WHERE id= 331512;
DELETE FROM business_subsectors WHERE id= 331513;
DELETE FROM business_subsectors WHERE id= 33152;
DELETE FROM business_subsectors WHERE id= 331523;
DELETE FROM business_subsectors WHERE id= 331524;
DELETE FROM business_subsectors WHERE id= 331529;
DELETE FROM business_subsectors WHERE id= 33211;
DELETE FROM business_subsectors WHERE id= 332111;
DELETE FROM business_subsectors WHERE id= 332112;
DELETE FROM business_subsectors WHERE id= 332114;
DELETE FROM business_subsectors WHERE id= 332117;
DELETE FROM business_subsectors WHERE id= 332119;
DELETE FROM business_subsectors WHERE id= 33221;
DELETE FROM business_subsectors WHERE id= 332215;
DELETE FROM business_subsectors WHERE id= 332216;
DELETE FROM business_subsectors WHERE id= 33231;
DELETE FROM business_subsectors WHERE id= 332311;
DELETE FROM business_subsectors WHERE id= 332312;
DELETE FROM business_subsectors WHERE id= 332313;
DELETE FROM business_subsectors WHERE id= 33232;
DELETE FROM business_subsectors WHERE id= 332321;
DELETE FROM business_subsectors WHERE id= 332322;
DELETE FROM business_subsectors WHERE id= 332323;
DELETE FROM business_subsectors WHERE id= 33241;
DELETE FROM business_subsectors WHERE id= 332410;
DELETE FROM business_subsectors WHERE id= 33242;
DELETE FROM business_subsectors WHERE id= 332420;
DELETE FROM business_subsectors WHERE id= 33243;
DELETE FROM business_subsectors WHERE id= 332431;
DELETE FROM business_subsectors WHERE id= 332439;
DELETE FROM business_subsectors WHERE id= 33251;
DELETE FROM business_subsectors WHERE id= 332510;
DELETE FROM business_subsectors WHERE id= 33261;
DELETE FROM business_subsectors WHERE id= 332613;
DELETE FROM business_subsectors WHERE id= 332618;
DELETE FROM business_subsectors WHERE id= 33271;
DELETE FROM business_subsectors WHERE id= 332710;
DELETE FROM business_subsectors WHERE id= 33272;
DELETE FROM business_subsectors WHERE id= 332721;
DELETE FROM business_subsectors WHERE id= 332722;
DELETE FROM business_subsectors WHERE id= 33281;
DELETE FROM business_subsectors WHERE id= 332811;
DELETE FROM business_subsectors WHERE id= 332812;
DELETE FROM business_subsectors WHERE id= 332813;
DELETE FROM business_subsectors WHERE id= 33291;
DELETE FROM business_subsectors WHERE id= 332911;
DELETE FROM business_subsectors WHERE id= 332912;
DELETE FROM business_subsectors WHERE id= 332913;
DELETE FROM business_subsectors WHERE id= 332919;
DELETE FROM business_subsectors WHERE id= 33299;
DELETE FROM business_subsectors WHERE id= 332991;
DELETE FROM business_subsectors WHERE id= 332992;
DELETE FROM business_subsectors WHERE id= 332993;
DELETE FROM business_subsectors WHERE id= 332994;
DELETE FROM business_subsectors WHERE id= 332996;
DELETE FROM business_subsectors WHERE id= 332999;
DELETE FROM business_subsectors WHERE id= 33311;
DELETE FROM business_subsectors WHERE id= 333111;
DELETE FROM business_subsectors WHERE id= 333112;
DELETE FROM business_subsectors WHERE id= 33312;
DELETE FROM business_subsectors WHERE id= 333120;
DELETE FROM business_subsectors WHERE id= 33313;
DELETE FROM business_subsectors WHERE id= 333131;
DELETE FROM business_subsectors WHERE id= 333132;
DELETE FROM business_subsectors WHERE id= 33324;
DELETE FROM business_subsectors WHERE id= 333241;
DELETE FROM business_subsectors WHERE id= 333242;
DELETE FROM business_subsectors WHERE id= 333243;
DELETE FROM business_subsectors WHERE id= 333244;
DELETE FROM business_subsectors WHERE id= 333248;
DELETE FROM business_subsectors WHERE id= 333249;
DELETE FROM business_subsectors WHERE id= 33331;
DELETE FROM business_subsectors WHERE id= 333310;
DELETE FROM business_subsectors WHERE id= 333314;
DELETE FROM business_subsectors WHERE id= 333316;
DELETE FROM business_subsectors WHERE id= 333318;
DELETE FROM business_subsectors WHERE id= 33341;
DELETE FROM business_subsectors WHERE id= 333413;
DELETE FROM business_subsectors WHERE id= 333414;
DELETE FROM business_subsectors WHERE id= 333415;
DELETE FROM business_subsectors WHERE id= 33351;
DELETE FROM business_subsectors WHERE id= 333511;
DELETE FROM business_subsectors WHERE id= 333514;
DELETE FROM business_subsectors WHERE id= 333515;
DELETE FROM business_subsectors WHERE id= 333517;
DELETE FROM business_subsectors WHERE id= 333519;
DELETE FROM business_subsectors WHERE id= 33361;
DELETE FROM business_subsectors WHERE id= 333611;
DELETE FROM business_subsectors WHERE id= 333612;
DELETE FROM business_subsectors WHERE id= 333613;
DELETE FROM business_subsectors WHERE id= 333618;
DELETE FROM business_subsectors WHERE id= 33391;
DELETE FROM business_subsectors WHERE id= 333912;
DELETE FROM business_subsectors WHERE id= 333914;
DELETE FROM business_subsectors WHERE id= 33392;
DELETE FROM business_subsectors WHERE id= 333921;
DELETE FROM business_subsectors WHERE id= 333922;
DELETE FROM business_subsectors WHERE id= 333923;
DELETE FROM business_subsectors WHERE id= 333924;
DELETE FROM business_subsectors WHERE id= 33399;
DELETE FROM business_subsectors WHERE id= 333991;
DELETE FROM business_subsectors WHERE id= 333992;
DELETE FROM business_subsectors WHERE id= 333993;
DELETE FROM business_subsectors WHERE id= 333994;
DELETE FROM business_subsectors WHERE id= 333995;
DELETE FROM business_subsectors WHERE id= 333996;
DELETE FROM business_subsectors WHERE id= 333997;
DELETE FROM business_subsectors WHERE id= 333998;
DELETE FROM business_subsectors WHERE id= 33411;
DELETE FROM business_subsectors WHERE id= 334111;
DELETE FROM business_subsectors WHERE id= 334112;
DELETE FROM business_subsectors WHERE id= 334118;
DELETE FROM business_subsectors WHERE id= 33421;
DELETE FROM business_subsectors WHERE id= 334210;
DELETE FROM business_subsectors WHERE id= 33422;
DELETE FROM business_subsectors WHERE id= 334220;
DELETE FROM business_subsectors WHERE id= 33429;
DELETE FROM business_subsectors WHERE id= 334290;
DELETE FROM business_subsectors WHERE id= 33431;
DELETE FROM business_subsectors WHERE id= 334310;
DELETE FROM business_subsectors WHERE id= 33441;
DELETE FROM business_subsectors WHERE id= 334412;
DELETE FROM business_subsectors WHERE id= 334413;
DELETE FROM business_subsectors WHERE id= 334416;
DELETE FROM business_subsectors WHERE id= 334417;
DELETE FROM business_subsectors WHERE id= 334418;
DELETE FROM business_subsectors WHERE id= 334419;
DELETE FROM business_subsectors WHERE id= 33451;
DELETE FROM business_subsectors WHERE id= 334510;
DELETE FROM business_subsectors WHERE id= 334511;
DELETE FROM business_subsectors WHERE id= 334512;
DELETE FROM business_subsectors WHERE id= 334513;
DELETE FROM business_subsectors WHERE id= 334514;
DELETE FROM business_subsectors WHERE id= 334515;
DELETE FROM business_subsectors WHERE id= 334516;
DELETE FROM business_subsectors WHERE id= 334517;
DELETE FROM business_subsectors WHERE id= 334519;
DELETE FROM business_subsectors WHERE id= 33461;
DELETE FROM business_subsectors WHERE id= 334610;
DELETE FROM business_subsectors WHERE id= 334613;
DELETE FROM business_subsectors WHERE id= 334614;
DELETE FROM business_subsectors WHERE id= 33513;
DELETE FROM business_subsectors WHERE id= 335131;
DELETE FROM business_subsectors WHERE id= 335132;
DELETE FROM business_subsectors WHERE id= 335139;
DELETE FROM business_subsectors WHERE id= 33511;
DELETE FROM business_subsectors WHERE id= 335110;
DELETE FROM business_subsectors WHERE id= 33512;
DELETE FROM business_subsectors WHERE id= 335121;
DELETE FROM business_subsectors WHERE id= 335122;
DELETE FROM business_subsectors WHERE id= 335129;
DELETE FROM business_subsectors WHERE id= 33521;
DELETE FROM business_subsectors WHERE id= 335210;
DELETE FROM business_subsectors WHERE id= 33522;
DELETE FROM business_subsectors WHERE id= 335220;
DELETE FROM business_subsectors WHERE id= 33531;
DELETE FROM business_subsectors WHERE id= 335311;
DELETE FROM business_subsectors WHERE id= 335312;
DELETE FROM business_subsectors WHERE id= 335313;
DELETE FROM business_subsectors WHERE id= 335314;
DELETE FROM business_subsectors WHERE id= 33591;
DELETE FROM business_subsectors WHERE id= 335910;
DELETE FROM business_subsectors WHERE id= 335911;
DELETE FROM business_subsectors WHERE id= 335912;
DELETE FROM business_subsectors WHERE id= 33592;
DELETE FROM business_subsectors WHERE id= 335921;
DELETE FROM business_subsectors WHERE id= 335929;
DELETE FROM business_subsectors WHERE id= 33593;
DELETE FROM business_subsectors WHERE id= 335931;
DELETE FROM business_subsectors WHERE id= 335932;
DELETE FROM business_subsectors WHERE id= 33599;
DELETE FROM business_subsectors WHERE id= 335991;
DELETE FROM business_subsectors WHERE id= 335999;
DELETE FROM business_subsectors WHERE id= 33611;
DELETE FROM business_subsectors WHERE id= 336110;
DELETE FROM business_subsectors WHERE id= 336111;
DELETE FROM business_subsectors WHERE id= 336112;
DELETE FROM business_subsectors WHERE id= 33612;
DELETE FROM business_subsectors WHERE id= 336120;
DELETE FROM business_subsectors WHERE id= 33621;
DELETE FROM business_subsectors WHERE id= 336211;
DELETE FROM business_subsectors WHERE id= 336212;
DELETE FROM business_subsectors WHERE id= 336213;
DELETE FROM business_subsectors WHERE id= 336214;
DELETE FROM business_subsectors WHERE id= 33631;
DELETE FROM business_subsectors WHERE id= 336310;
DELETE FROM business_subsectors WHERE id= 33632;
DELETE FROM business_subsectors WHERE id= 336320;
DELETE FROM business_subsectors WHERE id= 33633;
DELETE FROM business_subsectors WHERE id= 336330;
DELETE FROM business_subsectors WHERE id= 33634;
DELETE FROM business_subsectors WHERE id= 336340;
DELETE FROM business_subsectors WHERE id= 33635;
DELETE FROM business_subsectors WHERE id= 336350;
DELETE FROM business_subsectors WHERE id= 33636;
DELETE FROM business_subsectors WHERE id= 336360;
DELETE FROM business_subsectors WHERE id= 33637;
DELETE FROM business_subsectors WHERE id= 336370;
DELETE FROM business_subsectors WHERE id= 33639;
DELETE FROM business_subsectors WHERE id= 336390;
DELETE FROM business_subsectors WHERE id= 33641;
DELETE FROM business_subsectors WHERE id= 336411;
DELETE FROM business_subsectors WHERE id= 336412;
DELETE FROM business_subsectors WHERE id= 336413;
DELETE FROM business_subsectors WHERE id= 336414;
DELETE FROM business_subsectors WHERE id= 336415;
DELETE FROM business_subsectors WHERE id= 336419;
DELETE FROM business_subsectors WHERE id= 33651;
DELETE FROM business_subsectors WHERE id= 336510;
DELETE FROM business_subsectors WHERE id= 33661;
DELETE FROM business_subsectors WHERE id= 336611;
DELETE FROM business_subsectors WHERE id= 336612;
DELETE FROM business_subsectors WHERE id= 33699;
DELETE FROM business_subsectors WHERE id= 336991;
DELETE FROM business_subsectors WHERE id= 336992;
DELETE FROM business_subsectors WHERE id= 336999;
DELETE FROM business_subsectors WHERE id= 33711;
DELETE FROM business_subsectors WHERE id= 337110;
DELETE FROM business_subsectors WHERE id= 33712;
DELETE FROM business_subsectors WHERE id= 337121;
DELETE FROM business_subsectors WHERE id= 337122;
DELETE FROM business_subsectors WHERE id= 337124;
DELETE FROM business_subsectors WHERE id= 337125;
DELETE FROM business_subsectors WHERE id= 337126;
DELETE FROM business_subsectors WHERE id= 337127;
DELETE FROM business_subsectors WHERE id= 33721;
DELETE FROM business_subsectors WHERE id= 337211;
DELETE FROM business_subsectors WHERE id= 337212;
DELETE FROM business_subsectors WHERE id= 337214;
DELETE FROM business_subsectors WHERE id= 3379;
DELETE FROM business_subsectors WHERE id= 33791;
DELETE FROM business_subsectors WHERE id= 337910;
DELETE FROM business_subsectors WHERE id= 33792;
DELETE FROM business_subsectors WHERE id= 337920;
DELETE FROM business_subsectors WHERE id= 33911;
DELETE FROM business_subsectors WHERE id= 339112;
DELETE FROM business_subsectors WHERE id= 339113;
DELETE FROM business_subsectors WHERE id= 339114;
DELETE FROM business_subsectors WHERE id= 339115;
DELETE FROM business_subsectors WHERE id= 339116;
DELETE FROM business_subsectors WHERE id= 33991;
DELETE FROM business_subsectors WHERE id= 339910;
DELETE FROM business_subsectors WHERE id= 33992;
DELETE FROM business_subsectors WHERE id= 339920;
DELETE FROM business_subsectors WHERE id= 33993;
DELETE FROM business_subsectors WHERE id= 339930;
DELETE FROM business_subsectors WHERE id= 33994;
DELETE FROM business_subsectors WHERE id= 339940;
DELETE FROM business_subsectors WHERE id= 33995;
DELETE FROM business_subsectors WHERE id= 339950;
DELETE FROM business_subsectors WHERE id= 33999;
DELETE FROM business_subsectors WHERE id= 339991;
DELETE FROM business_subsectors WHERE id= 339992;
DELETE FROM business_subsectors WHERE id= 339993;
DELETE FROM business_subsectors WHERE id= 339994;
DELETE FROM business_subsectors WHERE id= 339995;
DELETE FROM business_subsectors WHERE id= 339999;
DELETE FROM business_subsectors WHERE id= 4231;
DELETE FROM business_subsectors WHERE id= 42311;
DELETE FROM business_subsectors WHERE id= 423110;
DELETE FROM business_subsectors WHERE id= 42312;
DELETE FROM business_subsectors WHERE id= 423120;
DELETE FROM business_subsectors WHERE id= 42313;
DELETE FROM business_subsectors WHERE id= 423130;
DELETE FROM business_subsectors WHERE id= 42314;
DELETE FROM business_subsectors WHERE id= 423140;
DELETE FROM business_subsectors WHERE id= 42321;
DELETE FROM business_subsectors WHERE id= 423210;
DELETE FROM business_subsectors WHERE id= 42322;
DELETE FROM business_subsectors WHERE id= 423220;
DELETE FROM business_subsectors WHERE id= 42331;
DELETE FROM business_subsectors WHERE id= 423310;
DELETE FROM business_subsectors WHERE id= 42332;
DELETE FROM business_subsectors WHERE id= 423320;
DELETE FROM business_subsectors WHERE id= 42333;
DELETE FROM business_subsectors WHERE id= 423330;
DELETE FROM business_subsectors WHERE id= 42339;
DELETE FROM business_subsectors WHERE id= 423390;
DELETE FROM business_subsectors WHERE id= 42341;
DELETE FROM business_subsectors WHERE id= 423410;
DELETE FROM business_subsectors WHERE id= 42342;
DELETE FROM business_subsectors WHERE id= 423420;
DELETE FROM business_subsectors WHERE id= 42343;
DELETE FROM business_subsectors WHERE id= 423430;
DELETE FROM business_subsectors WHERE id= 42344;
DELETE FROM business_subsectors WHERE id= 423440;
DELETE FROM business_subsectors WHERE id= 42345;
DELETE FROM business_subsectors WHERE id= 423450;
DELETE FROM business_subsectors WHERE id= 42346;
DELETE FROM business_subsectors WHERE id= 423460;
DELETE FROM business_subsectors WHERE id= 42349;
DELETE FROM business_subsectors WHERE id= 423490;
DELETE FROM business_subsectors WHERE id= 42351;
DELETE FROM business_subsectors WHERE id= 423510;
DELETE FROM business_subsectors WHERE id= 42352;
DELETE FROM business_subsectors WHERE id= 423520;
DELETE FROM business_subsectors WHERE id= 42361;
DELETE FROM business_subsectors WHERE id= 423610;
DELETE FROM business_subsectors WHERE id= 42362;
DELETE FROM business_subsectors WHERE id= 423620;
DELETE FROM business_subsectors WHERE id= 42369;
DELETE FROM business_subsectors WHERE id= 423690;
DELETE FROM business_subsectors WHERE id= 42371;
DELETE FROM business_subsectors WHERE id= 423710;
DELETE FROM business_subsectors WHERE id= 42372;
DELETE FROM business_subsectors WHERE id= 423720;
DELETE FROM business_subsectors WHERE id= 42373;
DELETE FROM business_subsectors WHERE id= 423730;
DELETE FROM business_subsectors WHERE id= 42374;
DELETE FROM business_subsectors WHERE id= 423740;
DELETE FROM business_subsectors WHERE id= 42381;
DELETE FROM business_subsectors WHERE id= 423810;
DELETE FROM business_subsectors WHERE id= 42382;
DELETE FROM business_subsectors WHERE id= 423820;
DELETE FROM business_subsectors WHERE id= 42383;
DELETE FROM business_subsectors WHERE id= 423830;
DELETE FROM business_subsectors WHERE id= 42384;
DELETE FROM business_subsectors WHERE id= 423840;
DELETE FROM business_subsectors WHERE id= 42385;
DELETE FROM business_subsectors WHERE id= 423850;
DELETE FROM business_subsectors WHERE id= 42386;
DELETE FROM business_subsectors WHERE id= 423860;
DELETE FROM business_subsectors WHERE id= 42391;
DELETE FROM business_subsectors WHERE id= 423910;
DELETE FROM business_subsectors WHERE id= 42392;
DELETE FROM business_subsectors WHERE id= 423920;
DELETE FROM business_subsectors WHERE id= 42393;
DELETE FROM business_subsectors WHERE id= 423930;
DELETE FROM business_subsectors WHERE id= 42394;
DELETE FROM business_subsectors WHERE id= 423940;
DELETE FROM business_subsectors WHERE id= 42399;
DELETE FROM business_subsectors WHERE id= 423990;
DELETE FROM business_subsectors WHERE id= 42411;
DELETE FROM business_subsectors WHERE id= 424110;
DELETE FROM business_subsectors WHERE id= 42412;
DELETE FROM business_subsectors WHERE id= 424120;
DELETE FROM business_subsectors WHERE id= 42413;
DELETE FROM business_subsectors WHERE id= 424130;
DELETE FROM business_subsectors WHERE id= 42421;
DELETE FROM business_subsectors WHERE id= 424210;
DELETE FROM business_subsectors WHERE id= 42431;
DELETE FROM business_subsectors WHERE id= 424310;
DELETE FROM business_subsectors WHERE id= 42432;
DELETE FROM business_subsectors WHERE id= 424320;
DELETE FROM business_subsectors WHERE id= 42433;
DELETE FROM business_subsectors WHERE id= 424330;
DELETE FROM business_subsectors WHERE id= 42434;
DELETE FROM business_subsectors WHERE id= 424340;
DELETE FROM business_subsectors WHERE id= 42435;
DELETE FROM business_subsectors WHERE id= 424350;
DELETE FROM business_subsectors WHERE id= 42441;
DELETE FROM business_subsectors WHERE id= 424410;
DELETE FROM business_subsectors WHERE id= 42442;
DELETE FROM business_subsectors WHERE id= 424420;
DELETE FROM business_subsectors WHERE id= 42443;
DELETE FROM business_subsectors WHERE id= 424430;
DELETE FROM business_subsectors WHERE id= 42444;
DELETE FROM business_subsectors WHERE id= 424440;
DELETE FROM business_subsectors WHERE id= 42445;
DELETE FROM business_subsectors WHERE id= 424450;
DELETE FROM business_subsectors WHERE id= 42446;
DELETE FROM business_subsectors WHERE id= 424460;
DELETE FROM business_subsectors WHERE id= 42447;
DELETE FROM business_subsectors WHERE id= 424470;
DELETE FROM business_subsectors WHERE id= 42448;
DELETE FROM business_subsectors WHERE id= 424480;
DELETE FROM business_subsectors WHERE id= 42449;
DELETE FROM business_subsectors WHERE id= 424490;
DELETE FROM business_subsectors WHERE id= 42451;
DELETE FROM business_subsectors WHERE id= 424510;
DELETE FROM business_subsectors WHERE id= 42452;
DELETE FROM business_subsectors WHERE id= 424520;
DELETE FROM business_subsectors WHERE id= 42459;
DELETE FROM business_subsectors WHERE id= 424590;
DELETE FROM business_subsectors WHERE id= 42461;
DELETE FROM business_subsectors WHERE id= 424610;
DELETE FROM business_subsectors WHERE id= 42469;
DELETE FROM business_subsectors WHERE id= 424690;
DELETE FROM business_subsectors WHERE id= 42471;
DELETE FROM business_subsectors WHERE id= 424710;
DELETE FROM business_subsectors WHERE id= 42472;
DELETE FROM business_subsectors WHERE id= 424720;
DELETE FROM business_subsectors WHERE id= 42481;
DELETE FROM business_subsectors WHERE id= 424810;
DELETE FROM business_subsectors WHERE id= 42482;
DELETE FROM business_subsectors WHERE id= 424820;
DELETE FROM business_subsectors WHERE id= 42491;
DELETE FROM business_subsectors WHERE id= 424910;
DELETE FROM business_subsectors WHERE id= 42492;
DELETE FROM business_subsectors WHERE id= 424920;
DELETE FROM business_subsectors WHERE id= 42493;
DELETE FROM business_subsectors WHERE id= 424930;
DELETE FROM business_subsectors WHERE id= 42494;
DELETE FROM business_subsectors WHERE id= 424940;
DELETE FROM business_subsectors WHERE id= 42495;
DELETE FROM business_subsectors WHERE id= 424950;
DELETE FROM business_subsectors WHERE id= 42499;
DELETE FROM business_subsectors WHERE id= 424990;
DELETE FROM business_subsectors WHERE id= 42511;
DELETE FROM business_subsectors WHERE id= 425110;
DELETE FROM business_subsectors WHERE id= 42512;
DELETE FROM business_subsectors WHERE id= 425120;
DELETE FROM business_subsectors WHERE id= 44111;
DELETE FROM business_subsectors WHERE id= 441110;
DELETE FROM business_subsectors WHERE id= 44112;
DELETE FROM business_subsectors WHERE id= 441120;
DELETE FROM business_subsectors WHERE id= 44121;
DELETE FROM business_subsectors WHERE id= 441210;
DELETE FROM business_subsectors WHERE id= 44122;
DELETE FROM business_subsectors WHERE id= 441222;
DELETE FROM business_subsectors WHERE id= 441227;
DELETE FROM business_subsectors WHERE id= 441228;
DELETE FROM business_subsectors WHERE id= 44131;
DELETE FROM business_subsectors WHERE id= 441310;
DELETE FROM business_subsectors WHERE id= 44132;
DELETE FROM business_subsectors WHERE id= 441320;
DELETE FROM business_subsectors WHERE id= 44133;
DELETE FROM business_subsectors WHERE id= 441330;
DELETE FROM business_subsectors WHERE id= 44134;
DELETE FROM business_subsectors WHERE id= 441340;
DELETE FROM business_subsectors WHERE id= 44211;
DELETE FROM business_subsectors WHERE id= 442110;
DELETE FROM business_subsectors WHERE id= 44221;
DELETE FROM business_subsectors WHERE id= 442210;
DELETE FROM business_subsectors WHERE id= 44229;
DELETE FROM business_subsectors WHERE id= 442291;
DELETE FROM business_subsectors WHERE id= 442299;
DELETE FROM business_subsectors WHERE id= 44314;
DELETE FROM business_subsectors WHERE id= 443141;
DELETE FROM business_subsectors WHERE id= 443142;
DELETE FROM business_subsectors WHERE id= 44411;
DELETE FROM business_subsectors WHERE id= 444110;
DELETE FROM business_subsectors WHERE id= 44412;
DELETE FROM business_subsectors WHERE id= 444120;
DELETE FROM business_subsectors WHERE id= 44413;
DELETE FROM business_subsectors WHERE id= 444130;
DELETE FROM business_subsectors WHERE id= 44414;
DELETE FROM business_subsectors WHERE id= 444140;
DELETE FROM business_subsectors WHERE id= 44418;
DELETE FROM business_subsectors WHERE id= 444180;
DELETE FROM business_subsectors WHERE id= 44419;
DELETE FROM business_subsectors WHERE id= 444190;
DELETE FROM business_subsectors WHERE id= 44421;
DELETE FROM business_subsectors WHERE id= 444210;
DELETE FROM business_subsectors WHERE id= 44422;
DELETE FROM business_subsectors WHERE id= 444220;
DELETE FROM business_subsectors WHERE id= 44423;
DELETE FROM business_subsectors WHERE id= 444230;
DELETE FROM business_subsectors WHERE id= 44424;
DELETE FROM business_subsectors WHERE id= 444240;
DELETE FROM business_subsectors WHERE id= 44511;
DELETE FROM business_subsectors WHERE id= 445110;
DELETE FROM business_subsectors WHERE id= 44512;
DELETE FROM business_subsectors WHERE id= 445120;
DELETE FROM business_subsectors WHERE id= 44513;
DELETE FROM business_subsectors WHERE id= 445131;
DELETE FROM business_subsectors WHERE id= 445132;
DELETE FROM business_subsectors WHERE id= 44521;
DELETE FROM business_subsectors WHERE id= 445210;
DELETE FROM business_subsectors WHERE id= 44522;
DELETE FROM business_subsectors WHERE id= 445220;
DELETE FROM business_subsectors WHERE id= 44523;
DELETE FROM business_subsectors WHERE id= 445230;
DELETE FROM business_subsectors WHERE id= 44524;
DELETE FROM business_subsectors WHERE id= 445240;
DELETE FROM business_subsectors WHERE id= 44525;
DELETE FROM business_subsectors WHERE id= 445250;
DELETE FROM business_subsectors WHERE id= 44529;
DELETE FROM business_subsectors WHERE id= 445291;
DELETE FROM business_subsectors WHERE id= 445292;
DELETE FROM business_subsectors WHERE id= 445298;
DELETE FROM business_subsectors WHERE id= 44531;
DELETE FROM business_subsectors WHERE id= 445310;
DELETE FROM business_subsectors WHERE id= 44532;
DELETE FROM business_subsectors WHERE id= 445320;
DELETE FROM business_subsectors WHERE id= 44611;
DELETE FROM business_subsectors WHERE id= 446110;
DELETE FROM business_subsectors WHERE id= 44612;
DELETE FROM business_subsectors WHERE id= 446120;
DELETE FROM business_subsectors WHERE id= 44613;
DELETE FROM business_subsectors WHERE id= 446130;
DELETE FROM business_subsectors WHERE id= 44619;
DELETE FROM business_subsectors WHERE id= 446191;
DELETE FROM business_subsectors WHERE id= 446199;
DELETE FROM business_subsectors WHERE id= 44711;
DELETE FROM business_subsectors WHERE id= 447110;
DELETE FROM business_subsectors WHERE id= 44719;
DELETE FROM business_subsectors WHERE id= 447190;
DELETE FROM business_subsectors WHERE id= 44811;
DELETE FROM business_subsectors WHERE id= 448110;
DELETE FROM business_subsectors WHERE id= 44812;
DELETE FROM business_subsectors WHERE id= 448120;
DELETE FROM business_subsectors WHERE id= 44813;
DELETE FROM business_subsectors WHERE id= 448130;
DELETE FROM business_subsectors WHERE id= 44814;
DELETE FROM business_subsectors WHERE id= 448140;
DELETE FROM business_subsectors WHERE id= 44815;
DELETE FROM business_subsectors WHERE id= 448150;
DELETE FROM business_subsectors WHERE id= 44819;
DELETE FROM business_subsectors WHERE id= 448190;
DELETE FROM business_subsectors WHERE id= 44821;
DELETE FROM business_subsectors WHERE id= 448210;
DELETE FROM business_subsectors WHERE id= 44831;
DELETE FROM business_subsectors WHERE id= 448310;
DELETE FROM business_subsectors WHERE id= 44832;
DELETE FROM business_subsectors WHERE id= 448320;
DELETE FROM business_subsectors WHERE id= 44911;
DELETE FROM business_subsectors WHERE id= 449110;
DELETE FROM business_subsectors WHERE id= 44912;
DELETE FROM business_subsectors WHERE id= 449121;
DELETE FROM business_subsectors WHERE id= 449122;
DELETE FROM business_subsectors WHERE id= 449129;
DELETE FROM business_subsectors WHERE id= 44921;
DELETE FROM business_subsectors WHERE id= 449210;
DELETE FROM business_subsectors WHERE id= 45111;
DELETE FROM business_subsectors WHERE id= 451110;
DELETE FROM business_subsectors WHERE id= 45112;
DELETE FROM business_subsectors WHERE id= 451120;
DELETE FROM business_subsectors WHERE id= 45113;
DELETE FROM business_subsectors WHERE id= 451130;
DELETE FROM business_subsectors WHERE id= 45114;
DELETE FROM business_subsectors WHERE id= 451140;
DELETE FROM business_subsectors WHERE id= 45121;
DELETE FROM business_subsectors WHERE id= 451211;
DELETE FROM business_subsectors WHERE id= 451212;
DELETE FROM business_subsectors WHERE id= 45221;
DELETE FROM business_subsectors WHERE id= 452210;
DELETE FROM business_subsectors WHERE id= 45231;
DELETE FROM business_subsectors WHERE id= 452311;
DELETE FROM business_subsectors WHERE id= 452319;
DELETE FROM business_subsectors WHERE id= 45311;
DELETE FROM business_subsectors WHERE id= 453110;
DELETE FROM business_subsectors WHERE id= 45321;
DELETE FROM business_subsectors WHERE id= 453210;
DELETE FROM business_subsectors WHERE id= 45322;
DELETE FROM business_subsectors WHERE id= 453220;
DELETE FROM business_subsectors WHERE id= 45331;
DELETE FROM business_subsectors WHERE id= 453310;
DELETE FROM business_subsectors WHERE id= 45391;
DELETE FROM business_subsectors WHERE id= 453910;
DELETE FROM business_subsectors WHERE id= 45392;
DELETE FROM business_subsectors WHERE id= 453920;
DELETE FROM business_subsectors WHERE id= 45393;
DELETE FROM business_subsectors WHERE id= 453930;
DELETE FROM business_subsectors WHERE id= 45399;
DELETE FROM business_subsectors WHERE id= 453991;
DELETE FROM business_subsectors WHERE id= 453998;
DELETE FROM business_subsectors WHERE id= 45411;
DELETE FROM business_subsectors WHERE id= 454110;
DELETE FROM business_subsectors WHERE id= 45421;
DELETE FROM business_subsectors WHERE id= 454210;
DELETE FROM business_subsectors WHERE id= 45431;
DELETE FROM business_subsectors WHERE id= 454310;
DELETE FROM business_subsectors WHERE id= 45439;
DELETE FROM business_subsectors WHERE id= 454390;
DELETE FROM business_subsectors WHERE id= 4849;
DELETE FROM business_subsectors WHERE id= 45511;
DELETE FROM business_subsectors WHERE id= 455110;
DELETE FROM business_subsectors WHERE id= 45521;
DELETE FROM business_subsectors WHERE id= 455211;
DELETE FROM business_subsectors WHERE id= 455219;
DELETE FROM business_subsectors WHERE id= 45611;
DELETE FROM business_subsectors WHERE id= 456110;
DELETE FROM business_subsectors WHERE id= 45612;
DELETE FROM business_subsectors WHERE id= 456120;
DELETE FROM business_subsectors WHERE id= 45613;
DELETE FROM business_subsectors WHERE id= 456130;
DELETE FROM business_subsectors WHERE id= 45619;
DELETE FROM business_subsectors WHERE id= 456191;
DELETE FROM business_subsectors WHERE id= 456199;
DELETE FROM business_subsectors WHERE id= 45711;
DELETE FROM business_subsectors WHERE id= 457110;
DELETE FROM business_subsectors WHERE id= 45712;
DELETE FROM business_subsectors WHERE id= 457120;
DELETE FROM business_subsectors WHERE id= 4572;
DELETE FROM business_subsectors WHERE id= 45721;
DELETE FROM business_subsectors WHERE id= 457210;
DELETE FROM business_subsectors WHERE id= 45811;
DELETE FROM business_subsectors WHERE id= 458110;
DELETE FROM business_subsectors WHERE id= 4582;
DELETE FROM business_subsectors WHERE id= 45821;
DELETE FROM business_subsectors WHERE id= 458210;
DELETE FROM business_subsectors WHERE id= 4583;
DELETE FROM business_subsectors WHERE id= 45831;
DELETE FROM business_subsectors WHERE id= 458310;
DELETE FROM business_subsectors WHERE id= 45832;
DELETE FROM business_subsectors WHERE id= 458320;
DELETE FROM business_subsectors WHERE id= 45911;
DELETE FROM business_subsectors WHERE id= 459110;
DELETE FROM business_subsectors WHERE id= 45912;
DELETE FROM business_subsectors WHERE id= 459120;
DELETE FROM business_subsectors WHERE id= 45913;
DELETE FROM business_subsectors WHERE id= 459130;
DELETE FROM business_subsectors WHERE id= 45914;
DELETE FROM business_subsectors WHERE id= 459140;
DELETE FROM business_subsectors WHERE id= 4592;
DELETE FROM business_subsectors WHERE id= 45921;
DELETE FROM business_subsectors WHERE id= 459210;
DELETE FROM business_subsectors WHERE id= 4593;
DELETE FROM business_subsectors WHERE id= 45931;
DELETE FROM business_subsectors WHERE id= 459310;
DELETE FROM business_subsectors WHERE id= 4594;
DELETE FROM business_subsectors WHERE id= 45941;
DELETE FROM business_subsectors WHERE id= 459410;
DELETE FROM business_subsectors WHERE id= 45942;
DELETE FROM business_subsectors WHERE id= 459420;
DELETE FROM business_subsectors WHERE id= 4595;
DELETE FROM business_subsectors WHERE id= 45951;
DELETE FROM business_subsectors WHERE id= 459510;
DELETE FROM business_subsectors WHERE id= 4599;
DELETE FROM business_subsectors WHERE id= 45991;
DELETE FROM business_subsectors WHERE id= 459910;
DELETE FROM business_subsectors WHERE id= 45992;
DELETE FROM business_subsectors WHERE id= 459920;
DELETE FROM business_subsectors WHERE id= 45993;
DELETE FROM business_subsectors WHERE id= 459930;
DELETE FROM business_subsectors WHERE id= 45999;
DELETE FROM business_subsectors WHERE id= 459991;
DELETE FROM business_subsectors WHERE id= 459999;
DELETE FROM business_subsectors WHERE id= 48111;
DELETE FROM business_subsectors WHERE id= 481111;
DELETE FROM business_subsectors WHERE id= 481112;
DELETE FROM business_subsectors WHERE id= 48121;
DELETE FROM business_subsectors WHERE id= 481211;
DELETE FROM business_subsectors WHERE id= 481212;
DELETE FROM business_subsectors WHERE id= 481219;
DELETE FROM business_subsectors WHERE id= 48211;
DELETE FROM business_subsectors WHERE id= 482111;
DELETE FROM business_subsectors WHERE id= 482112;
DELETE FROM business_subsectors WHERE id= 48311;
DELETE FROM business_subsectors WHERE id= 483111;
DELETE FROM business_subsectors WHERE id= 483112;
DELETE FROM business_subsectors WHERE id= 483113;
DELETE FROM business_subsectors WHERE id= 483114;
DELETE FROM business_subsectors WHERE id= 48321;
DELETE FROM business_subsectors WHERE id= 483211;
DELETE FROM business_subsectors WHERE id= 483212;
DELETE FROM business_subsectors WHERE id= 48411;
DELETE FROM business_subsectors WHERE id= 484110;
DELETE FROM business_subsectors WHERE id= 48412;
DELETE FROM business_subsectors WHERE id= 484121;
DELETE FROM business_subsectors WHERE id= 484122;
DELETE FROM business_subsectors WHERE id= 48421;
DELETE FROM business_subsectors WHERE id= 484210;
DELETE FROM business_subsectors WHERE id= 48422;
DELETE FROM business_subsectors WHERE id= 484220;
DELETE FROM business_subsectors WHERE id= 48423;
DELETE FROM business_subsectors WHERE id= 484230;
DELETE FROM business_subsectors WHERE id= 48511;
DELETE FROM business_subsectors WHERE id= 485111;
DELETE FROM business_subsectors WHERE id= 485112;
DELETE FROM business_subsectors WHERE id= 485113;
DELETE FROM business_subsectors WHERE id= 485119;
DELETE FROM business_subsectors WHERE id= 48521;
DELETE FROM business_subsectors WHERE id= 485210;
DELETE FROM business_subsectors WHERE id= 48531;
DELETE FROM business_subsectors WHERE id= 485310;
DELETE FROM business_subsectors WHERE id= 48532;
DELETE FROM business_subsectors WHERE id= 485320;
DELETE FROM business_subsectors WHERE id= 48541;
DELETE FROM business_subsectors WHERE id= 485410;
DELETE FROM business_subsectors WHERE id= 48551;
DELETE FROM business_subsectors WHERE id= 485510;
DELETE FROM business_subsectors WHERE id= 48599;
DELETE FROM business_subsectors WHERE id= 485991;
DELETE FROM business_subsectors WHERE id= 485999;
DELETE FROM business_subsectors WHERE id= 48611;
DELETE FROM business_subsectors WHERE id= 486110;
DELETE FROM business_subsectors WHERE id= 48621;
DELETE FROM business_subsectors WHERE id= 486210;
DELETE FROM business_subsectors WHERE id= 48691;
DELETE FROM business_subsectors WHERE id= 486910;
DELETE FROM business_subsectors WHERE id= 48699;
DELETE FROM business_subsectors WHERE id= 486990;
DELETE FROM business_subsectors WHERE id= 48711;
DELETE FROM business_subsectors WHERE id= 487110;
DELETE FROM business_subsectors WHERE id= 48721;
DELETE FROM business_subsectors WHERE id= 487210;
DELETE FROM business_subsectors WHERE id= 48799;
DELETE FROM business_subsectors WHERE id= 487990;
DELETE FROM business_subsectors WHERE id= 48811;
DELETE FROM business_subsectors WHERE id= 488111;
DELETE FROM business_subsectors WHERE id= 488119;
DELETE FROM business_subsectors WHERE id= 48819;
DELETE FROM business_subsectors WHERE id= 488190;
DELETE FROM business_subsectors WHERE id= 48821;
DELETE FROM business_subsectors WHERE id= 488210;
DELETE FROM business_subsectors WHERE id= 48831;
DELETE FROM business_subsectors WHERE id= 488310;
DELETE FROM business_subsectors WHERE id= 48832;
DELETE FROM business_subsectors WHERE id= 488320;
DELETE FROM business_subsectors WHERE id= 48833;
DELETE FROM business_subsectors WHERE id= 488330;
DELETE FROM business_subsectors WHERE id= 48839;
DELETE FROM business_subsectors WHERE id= 488390;
DELETE FROM business_subsectors WHERE id= 48841;
DELETE FROM business_subsectors WHERE id= 488410;
DELETE FROM business_subsectors WHERE id= 48849;
DELETE FROM business_subsectors WHERE id= 488490;
DELETE FROM business_subsectors WHERE id= 48851;
DELETE FROM business_subsectors WHERE id= 488510;
DELETE FROM business_subsectors WHERE id= 48899;
DELETE FROM business_subsectors WHERE id= 488991;
DELETE FROM business_subsectors WHERE id= 488999;
DELETE FROM business_subsectors WHERE id= 49111;
DELETE FROM business_subsectors WHERE id= 491110;
DELETE FROM business_subsectors WHERE id= 49211;
DELETE FROM business_subsectors WHERE id= 492110;
DELETE FROM business_subsectors WHERE id= 49221;
DELETE FROM business_subsectors WHERE id= 492210;
DELETE FROM business_subsectors WHERE id= 49311;
DELETE FROM business_subsectors WHERE id= 493110;
DELETE FROM business_subsectors WHERE id= 49312;
DELETE FROM business_subsectors WHERE id= 493120;
DELETE FROM business_subsectors WHERE id= 49313;
DELETE FROM business_subsectors WHERE id= 493130;
DELETE FROM business_subsectors WHERE id= 49319;
DELETE FROM business_subsectors WHERE id= 493190;
DELETE FROM business_subsectors WHERE id= 51111;
DELETE FROM business_subsectors WHERE id= 511110;
DELETE FROM business_subsectors WHERE id= 51112;
DELETE FROM business_subsectors WHERE id= 511120;
DELETE FROM business_subsectors WHERE id= 51113;
DELETE FROM business_subsectors WHERE id= 511130;
DELETE FROM business_subsectors WHERE id= 51114;
DELETE FROM business_subsectors WHERE id= 511140;
DELETE FROM business_subsectors WHERE id= 51119;
DELETE FROM business_subsectors WHERE id= 511191;
DELETE FROM business_subsectors WHERE id= 511199;
DELETE FROM business_subsectors WHERE id= 51121;
DELETE FROM business_subsectors WHERE id= 511210;
DELETE FROM business_subsectors WHERE id= 51211;
DELETE FROM business_subsectors WHERE id= 512110;
DELETE FROM business_subsectors WHERE id= 51212;
DELETE FROM business_subsectors WHERE id= 512120;
DELETE FROM business_subsectors WHERE id= 51213;
DELETE FROM business_subsectors WHERE id= 512131;
DELETE FROM business_subsectors WHERE id= 512132;
DELETE FROM business_subsectors WHERE id= 51219;
DELETE FROM business_subsectors WHERE id= 512191;
DELETE FROM business_subsectors WHERE id= 512199;
DELETE FROM business_subsectors WHERE id= 51223;
DELETE FROM business_subsectors WHERE id= 512230;
DELETE FROM business_subsectors WHERE id= 51224;
DELETE FROM business_subsectors WHERE id= 512240;
DELETE FROM business_subsectors WHERE id= 51225;
DELETE FROM business_subsectors WHERE id= 512250;
DELETE FROM business_subsectors WHERE id= 51229;
DELETE FROM business_subsectors WHERE id= 512290;
DELETE FROM business_subsectors WHERE id= 51311;
DELETE FROM business_subsectors WHERE id= 513110;
DELETE FROM business_subsectors WHERE id= 51312;
DELETE FROM business_subsectors WHERE id= 513120;
DELETE FROM business_subsectors WHERE id= 51313;
DELETE FROM business_subsectors WHERE id= 513130;
DELETE FROM business_subsectors WHERE id= 51314;
DELETE FROM business_subsectors WHERE id= 513140;
DELETE FROM business_subsectors WHERE id= 51319;
DELETE FROM business_subsectors WHERE id= 513191;
DELETE FROM business_subsectors WHERE id= 513199;
DELETE FROM business_subsectors WHERE id= 51321;
DELETE FROM business_subsectors WHERE id= 513210;
DELETE FROM business_subsectors WHERE id= 51511;
DELETE FROM business_subsectors WHERE id= 515111;
DELETE FROM business_subsectors WHERE id= 515112;
DELETE FROM business_subsectors WHERE id= 51512;
DELETE FROM business_subsectors WHERE id= 515120;
DELETE FROM business_subsectors WHERE id= 51521;
DELETE FROM business_subsectors WHERE id= 515210;
DELETE FROM business_subsectors WHERE id= 51611;
DELETE FROM business_subsectors WHERE id= 516110;
DELETE FROM business_subsectors WHERE id= 516120;
DELETE FROM business_subsectors WHERE id= 5162;
DELETE FROM business_subsectors WHERE id= 51621;
DELETE FROM business_subsectors WHERE id= 516210;
DELETE FROM business_subsectors WHERE id= 51711;
DELETE FROM business_subsectors WHERE id= 517111;
DELETE FROM business_subsectors WHERE id= 517112;
DELETE FROM business_subsectors WHERE id= 51712;
DELETE FROM business_subsectors WHERE id= 517121;
DELETE FROM business_subsectors WHERE id= 517122;
DELETE FROM business_subsectors WHERE id= 51731;
DELETE FROM business_subsectors WHERE id= 517311;
DELETE FROM business_subsectors WHERE id= 517312;
DELETE FROM business_subsectors WHERE id= 51741;
DELETE FROM business_subsectors WHERE id= 517410;
DELETE FROM business_subsectors WHERE id= 51781;
DELETE FROM business_subsectors WHERE id= 517810;
DELETE FROM business_subsectors WHERE id= 51791;
DELETE FROM business_subsectors WHERE id= 517911;
DELETE FROM business_subsectors WHERE id= 517919;
DELETE FROM business_subsectors WHERE id= 51821;
DELETE FROM business_subsectors WHERE id= 518210;
DELETE FROM business_subsectors WHERE id= 51911;
DELETE FROM business_subsectors WHERE id= 519110;
DELETE FROM business_subsectors WHERE id= 51912;
DELETE FROM business_subsectors WHERE id= 519120;
DELETE FROM business_subsectors WHERE id= 51913;
DELETE FROM business_subsectors WHERE id= 519130;
DELETE FROM business_subsectors WHERE id= 51919;
DELETE FROM business_subsectors WHERE id= 519190;
DELETE FROM business_subsectors WHERE id= 5192;
DELETE FROM business_subsectors WHERE id= 51921;
DELETE FROM business_subsectors WHERE id= 519210;
DELETE FROM business_subsectors WHERE id= 51929;
DELETE FROM business_subsectors WHERE id= 519290;
DELETE FROM business_subsectors WHERE id= 52111;
DELETE FROM business_subsectors WHERE id= 521110;
DELETE FROM business_subsectors WHERE id= 52211;
DELETE FROM business_subsectors WHERE id= 522110;
DELETE FROM business_subsectors WHERE id= 52212;
DELETE FROM business_subsectors WHERE id= 522120;
DELETE FROM business_subsectors WHERE id= 52213;
DELETE FROM business_subsectors WHERE id= 522130;
DELETE FROM business_subsectors WHERE id= 52218;
DELETE FROM business_subsectors WHERE id= 522180;
DELETE FROM business_subsectors WHERE id= 52219;
DELETE FROM business_subsectors WHERE id= 522190;
DELETE FROM business_subsectors WHERE id= 52221;
DELETE FROM business_subsectors WHERE id= 522210;
DELETE FROM business_subsectors WHERE id= 52222;
DELETE FROM business_subsectors WHERE id= 522220;
DELETE FROM business_subsectors WHERE id= 52229;
DELETE FROM business_subsectors WHERE id= 522291;
DELETE FROM business_subsectors WHERE id= 522292;
DELETE FROM business_subsectors WHERE id= 522293;
DELETE FROM business_subsectors WHERE id= 522294;
DELETE FROM business_subsectors WHERE id= 522298;
DELETE FROM business_subsectors WHERE id= 522299;
DELETE FROM business_subsectors WHERE id= 52231;
DELETE FROM business_subsectors WHERE id= 522310;
DELETE FROM business_subsectors WHERE id= 52232;
DELETE FROM business_subsectors WHERE id= 522320;
DELETE FROM business_subsectors WHERE id= 52239;
DELETE FROM business_subsectors WHERE id= 522390;
DELETE FROM business_subsectors WHERE id= 52311;
DELETE FROM business_subsectors WHERE id= 523110;
DELETE FROM business_subsectors WHERE id= 52312;
DELETE FROM business_subsectors WHERE id= 523120;
DELETE FROM business_subsectors WHERE id= 52313;
DELETE FROM business_subsectors WHERE id= 523130;
DELETE FROM business_subsectors WHERE id= 52314;
DELETE FROM business_subsectors WHERE id= 523140;
DELETE FROM business_subsectors WHERE id= 52315;
DELETE FROM business_subsectors WHERE id= 523150;
DELETE FROM business_subsectors WHERE id= 52316;
DELETE FROM business_subsectors WHERE id= 523160;
DELETE FROM business_subsectors WHERE id= 52321;
DELETE FROM business_subsectors WHERE id= 523210;
DELETE FROM business_subsectors WHERE id= 52391;
DELETE FROM business_subsectors WHERE id= 523910;
DELETE FROM business_subsectors WHERE id= 52392;
DELETE FROM business_subsectors WHERE id= 523920;
DELETE FROM business_subsectors WHERE id= 52393;
DELETE FROM business_subsectors WHERE id= 523930;
DELETE FROM business_subsectors WHERE id= 52394;
DELETE FROM business_subsectors WHERE id= 523940;
DELETE FROM business_subsectors WHERE id= 52399;
DELETE FROM business_subsectors WHERE id= 523991;
DELETE FROM business_subsectors WHERE id= 523999;
DELETE FROM business_subsectors WHERE id= 52411;
DELETE FROM business_subsectors WHERE id= 524113;
DELETE FROM business_subsectors WHERE id= 524114;
DELETE FROM business_subsectors WHERE id= 52412;
DELETE FROM business_subsectors WHERE id= 524126;
DELETE FROM business_subsectors WHERE id= 524127;
DELETE FROM business_subsectors WHERE id= 524128;
DELETE FROM business_subsectors WHERE id= 52413;
DELETE FROM business_subsectors WHERE id= 524130;
DELETE FROM business_subsectors WHERE id= 52421;
DELETE FROM business_subsectors WHERE id= 524210;
DELETE FROM business_subsectors WHERE id= 52429;
DELETE FROM business_subsectors WHERE id= 524291;
DELETE FROM business_subsectors WHERE id= 524292;
DELETE FROM business_subsectors WHERE id= 524298;
DELETE FROM business_subsectors WHERE id= 52511;
DELETE FROM business_subsectors WHERE id= 525110;
DELETE FROM business_subsectors WHERE id= 52512;
DELETE FROM business_subsectors WHERE id= 525120;
DELETE FROM business_subsectors WHERE id= 52519;
DELETE FROM business_subsectors WHERE id= 525190;
DELETE FROM business_subsectors WHERE id= 52591;
DELETE FROM business_subsectors WHERE id= 525910;
DELETE FROM business_subsectors WHERE id= 52592;
DELETE FROM business_subsectors WHERE id= 525920;
DELETE FROM business_subsectors WHERE id= 52599;
DELETE FROM business_subsectors WHERE id= 525990;
DELETE FROM business_subsectors WHERE id= 53111;
DELETE FROM business_subsectors WHERE id= 531110;
DELETE FROM business_subsectors WHERE id= 53112;
DELETE FROM business_subsectors WHERE id= 531120;
DELETE FROM business_subsectors WHERE id= 53113;
DELETE FROM business_subsectors WHERE id= 531130;
DELETE FROM business_subsectors WHERE id= 53119;
DELETE FROM business_subsectors WHERE id= 531190;
DELETE FROM business_subsectors WHERE id= 53121;
DELETE FROM business_subsectors WHERE id= 531210;
DELETE FROM business_subsectors WHERE id= 53131;
DELETE FROM business_subsectors WHERE id= 531311;
DELETE FROM business_subsectors WHERE id= 531312;
DELETE FROM business_subsectors WHERE id= 53132;
DELETE FROM business_subsectors WHERE id= 531320;
DELETE FROM business_subsectors WHERE id= 53139;
DELETE FROM business_subsectors WHERE id= 531390;
DELETE FROM business_subsectors WHERE id= 53211;
DELETE FROM business_subsectors WHERE id= 532111;
DELETE FROM business_subsectors WHERE id= 532112;
DELETE FROM business_subsectors WHERE id= 53212;
DELETE FROM business_subsectors WHERE id= 532120;
DELETE FROM business_subsectors WHERE id= 53221;
DELETE FROM business_subsectors WHERE id= 532210;
DELETE FROM business_subsectors WHERE id= 53228;
DELETE FROM business_subsectors WHERE id= 532281;
DELETE FROM business_subsectors WHERE id= 532282;
DELETE FROM business_subsectors WHERE id= 532283;
DELETE FROM business_subsectors WHERE id= 532284;
DELETE FROM business_subsectors WHERE id= 532289;
DELETE FROM business_subsectors WHERE id= 53231;
DELETE FROM business_subsectors WHERE id= 532310;
DELETE FROM business_subsectors WHERE id= 53241;
DELETE FROM business_subsectors WHERE id= 532411;
DELETE FROM business_subsectors WHERE id= 532412;
DELETE FROM business_subsectors WHERE id= 53242;
DELETE FROM business_subsectors WHERE id= 532420;
DELETE FROM business_subsectors WHERE id= 53249;
DELETE FROM business_subsectors WHERE id= 532490;
DELETE FROM business_subsectors WHERE id= 53311;
DELETE FROM business_subsectors WHERE id= 533110;
DELETE FROM business_subsectors WHERE id= 54111;
DELETE FROM business_subsectors WHERE id= 541110;
DELETE FROM business_subsectors WHERE id= 54112;
DELETE FROM business_subsectors WHERE id= 541120;
DELETE FROM business_subsectors WHERE id= 54119;
DELETE FROM business_subsectors WHERE id= 541191;
DELETE FROM business_subsectors WHERE id= 541199;
DELETE FROM business_subsectors WHERE id= 54121;
DELETE FROM business_subsectors WHERE id= 541211;
DELETE FROM business_subsectors WHERE id= 541213;
DELETE FROM business_subsectors WHERE id= 541214;
DELETE FROM business_subsectors WHERE id= 541219;
DELETE FROM business_subsectors WHERE id= 54131;
DELETE FROM business_subsectors WHERE id= 541310;
DELETE FROM business_subsectors WHERE id= 54132;
DELETE FROM business_subsectors WHERE id= 541320;
DELETE FROM business_subsectors WHERE id= 54133;
DELETE FROM business_subsectors WHERE id= 541330;
DELETE FROM business_subsectors WHERE id= 54134;
DELETE FROM business_subsectors WHERE id= 541340;
DELETE FROM business_subsectors WHERE id= 54135;
DELETE FROM business_subsectors WHERE id= 541350;
DELETE FROM business_subsectors WHERE id= 54136;
DELETE FROM business_subsectors WHERE id= 541360;
DELETE FROM business_subsectors WHERE id= 54137;
DELETE FROM business_subsectors WHERE id= 541370;
DELETE FROM business_subsectors WHERE id= 54138;
DELETE FROM business_subsectors WHERE id= 541380;
DELETE FROM business_subsectors WHERE id= 54141;
DELETE FROM business_subsectors WHERE id= 541410;
DELETE FROM business_subsectors WHERE id= 54142;
DELETE FROM business_subsectors WHERE id= 541420;
DELETE FROM business_subsectors WHERE id= 54143;
DELETE FROM business_subsectors WHERE id= 541430;
DELETE FROM business_subsectors WHERE id= 54149;
DELETE FROM business_subsectors WHERE id= 541490;
DELETE FROM business_subsectors WHERE id= 54151;
DELETE FROM business_subsectors WHERE id= 541511;
DELETE FROM business_subsectors WHERE id= 541512;
DELETE FROM business_subsectors WHERE id= 541513;
DELETE FROM business_subsectors WHERE id= 541519;
DELETE FROM business_subsectors WHERE id= 54161;
DELETE FROM business_subsectors WHERE id= 541611;
DELETE FROM business_subsectors WHERE id= 541612;
DELETE FROM business_subsectors WHERE id= 541613;
DELETE FROM business_subsectors WHERE id= 541614;
DELETE FROM business_subsectors WHERE id= 541618;
DELETE FROM business_subsectors WHERE id= 54162;
DELETE FROM business_subsectors WHERE id= 541620;
DELETE FROM business_subsectors WHERE id= 54169;
DELETE FROM business_subsectors WHERE id= 541690;
DELETE FROM business_subsectors WHERE id= 54171;
DELETE FROM business_subsectors WHERE id= 541713;
DELETE FROM business_subsectors WHERE id= 541714;
DELETE FROM business_subsectors WHERE id= 541715;
DELETE FROM business_subsectors WHERE id= 54172;
DELETE FROM business_subsectors WHERE id= 541720;
DELETE FROM business_subsectors WHERE id= 54181;
DELETE FROM business_subsectors WHERE id= 541810;
DELETE FROM business_subsectors WHERE id= 54182;
DELETE FROM business_subsectors WHERE id= 541820;
DELETE FROM business_subsectors WHERE id= 54183;
DELETE FROM business_subsectors WHERE id= 541830;
DELETE FROM business_subsectors WHERE id= 54184;
DELETE FROM business_subsectors WHERE id= 541840;
DELETE FROM business_subsectors WHERE id= 54185;
DELETE FROM business_subsectors WHERE id= 541850;
DELETE FROM business_subsectors WHERE id= 54186;
DELETE FROM business_subsectors WHERE id= 541860;
DELETE FROM business_subsectors WHERE id= 54187;
DELETE FROM business_subsectors WHERE id= 541870;
DELETE FROM business_subsectors WHERE id= 54189;
DELETE FROM business_subsectors WHERE id= 541890;
DELETE FROM business_subsectors WHERE id= 54191;
DELETE FROM business_subsectors WHERE id= 541910;
DELETE FROM business_subsectors WHERE id= 54192;
DELETE FROM business_subsectors WHERE id= 541921;
DELETE FROM business_subsectors WHERE id= 541922;
DELETE FROM business_subsectors WHERE id= 54193;
DELETE FROM business_subsectors WHERE id= 541930;
DELETE FROM business_subsectors WHERE id= 54194;
DELETE FROM business_subsectors WHERE id= 541940;
DELETE FROM business_subsectors WHERE id= 54199;
DELETE FROM business_subsectors WHERE id= 541990;
DELETE FROM business_subsectors WHERE id= 55111;
DELETE FROM business_subsectors WHERE id= 551111;
DELETE FROM business_subsectors WHERE id= 551112;
DELETE FROM business_subsectors WHERE id= 551114;
DELETE FROM business_subsectors WHERE id= 56111;
DELETE FROM business_subsectors WHERE id= 561110;
DELETE FROM business_subsectors WHERE id= 56121;
DELETE FROM business_subsectors WHERE id= 561210;
DELETE FROM business_subsectors WHERE id= 56131;
DELETE FROM business_subsectors WHERE id= 561311;
DELETE FROM business_subsectors WHERE id= 561312;
DELETE FROM business_subsectors WHERE id= 56132;
DELETE FROM business_subsectors WHERE id= 561320;
DELETE FROM business_subsectors WHERE id= 56133;
DELETE FROM business_subsectors WHERE id= 561330;
DELETE FROM business_subsectors WHERE id= 56141;
DELETE FROM business_subsectors WHERE id= 561410;
DELETE FROM business_subsectors WHERE id= 56142;
DELETE FROM business_subsectors WHERE id= 561421;
DELETE FROM business_subsectors WHERE id= 561422;
DELETE FROM business_subsectors WHERE id= 56143;
DELETE FROM business_subsectors WHERE id= 561431;
DELETE FROM business_subsectors WHERE id= 561439;
DELETE FROM business_subsectors WHERE id= 56144;
DELETE FROM business_subsectors WHERE id= 561440;
DELETE FROM business_subsectors WHERE id= 56145;
DELETE FROM business_subsectors WHERE id= 561450;
DELETE FROM business_subsectors WHERE id= 56149;
DELETE FROM business_subsectors WHERE id= 561491;
DELETE FROM business_subsectors WHERE id= 561492;
DELETE FROM business_subsectors WHERE id= 561499;
DELETE FROM business_subsectors WHERE id= 56151;
DELETE FROM business_subsectors WHERE id= 561510;
DELETE FROM business_subsectors WHERE id= 56152;
DELETE FROM business_subsectors WHERE id= 561520;
DELETE FROM business_subsectors WHERE id= 56159;
DELETE FROM business_subsectors WHERE id= 561591;
DELETE FROM business_subsectors WHERE id= 561599;
DELETE FROM business_subsectors WHERE id= 56161;
DELETE FROM business_subsectors WHERE id= 561611;
DELETE FROM business_subsectors WHERE id= 561612;
DELETE FROM business_subsectors WHERE id= 561613;
DELETE FROM business_subsectors WHERE id= 56162;
DELETE FROM business_subsectors WHERE id= 561621;
DELETE FROM business_subsectors WHERE id= 561622;
DELETE FROM business_subsectors WHERE id= 56171;
DELETE FROM business_subsectors WHERE id= 561710;
DELETE FROM business_subsectors WHERE id= 56172;
DELETE FROM business_subsectors WHERE id= 561720;
DELETE FROM business_subsectors WHERE id= 56173;
DELETE FROM business_subsectors WHERE id= 561730;
DELETE FROM business_subsectors WHERE id= 56174;
DELETE FROM business_subsectors WHERE id= 561740;
DELETE FROM business_subsectors WHERE id= 56179;
DELETE FROM business_subsectors WHERE id= 561790;
DELETE FROM business_subsectors WHERE id= 56191;
DELETE FROM business_subsectors WHERE id= 561910;
DELETE FROM business_subsectors WHERE id= 56192;
DELETE FROM business_subsectors WHERE id= 561920;
DELETE FROM business_subsectors WHERE id= 56199;
DELETE FROM business_subsectors WHERE id= 561990;
DELETE FROM business_subsectors WHERE id= 56211;
DELETE FROM business_subsectors WHERE id= 562111;
DELETE FROM business_subsectors WHERE id= 562112;
DELETE FROM business_subsectors WHERE id= 562119;
DELETE FROM business_subsectors WHERE id= 56221;
DELETE FROM business_subsectors WHERE id= 562211;
DELETE FROM business_subsectors WHERE id= 562212;
DELETE FROM business_subsectors WHERE id= 562213;
DELETE FROM business_subsectors WHERE id= 562219;
DELETE FROM business_subsectors WHERE id= 56291;
DELETE FROM business_subsectors WHERE id= 562910;
DELETE FROM business_subsectors WHERE id= 56292;
DELETE FROM business_subsectors WHERE id= 562920;
DELETE FROM business_subsectors WHERE id= 56299;
DELETE FROM business_subsectors WHERE id= 562991;
DELETE FROM business_subsectors WHERE id= 562998;
DELETE FROM business_subsectors WHERE id= 61111;
DELETE FROM business_subsectors WHERE id= 611110;
DELETE FROM business_subsectors WHERE id= 61121;
DELETE FROM business_subsectors WHERE id= 611210;
DELETE FROM business_subsectors WHERE id= 61131;
DELETE FROM business_subsectors WHERE id= 611310;
DELETE FROM business_subsectors WHERE id= 61141;
DELETE FROM business_subsectors WHERE id= 611410;
DELETE FROM business_subsectors WHERE id= 61142;
DELETE FROM business_subsectors WHERE id= 611420;
DELETE FROM business_subsectors WHERE id= 61143;
DELETE FROM business_subsectors WHERE id= 611430;
DELETE FROM business_subsectors WHERE id= 61151;
DELETE FROM business_subsectors WHERE id= 611511;
DELETE FROM business_subsectors WHERE id= 611512;
DELETE FROM business_subsectors WHERE id= 611513;
DELETE FROM business_subsectors WHERE id= 611519;
DELETE FROM business_subsectors WHERE id= 61161;
DELETE FROM business_subsectors WHERE id= 611610;
DELETE FROM business_subsectors WHERE id= 61162;
DELETE FROM business_subsectors WHERE id= 611620;
DELETE FROM business_subsectors WHERE id= 61163;
DELETE FROM business_subsectors WHERE id= 611630;
DELETE FROM business_subsectors WHERE id= 61169;
DELETE FROM business_subsectors WHERE id= 611691;
DELETE FROM business_subsectors WHERE id= 611692;
DELETE FROM business_subsectors WHERE id= 611699;
DELETE FROM business_subsectors WHERE id= 61171;
DELETE FROM business_subsectors WHERE id= 611710;
DELETE FROM business_subsectors WHERE id= 62111;
DELETE FROM business_subsectors WHERE id= 621111;
DELETE FROM business_subsectors WHERE id= 621112;
DELETE FROM business_subsectors WHERE id= 62121;
DELETE FROM business_subsectors WHERE id= 621210;
DELETE FROM business_subsectors WHERE id= 62131;
DELETE FROM business_subsectors WHERE id= 621310;
DELETE FROM business_subsectors WHERE id= 62132;
DELETE FROM business_subsectors WHERE id= 621320;
DELETE FROM business_subsectors WHERE id= 62133;
DELETE FROM business_subsectors WHERE id= 621330;
DELETE FROM business_subsectors WHERE id= 62134;
DELETE FROM business_subsectors WHERE id= 621340;
DELETE FROM business_subsectors WHERE id= 62139;
DELETE FROM business_subsectors WHERE id= 621391;
DELETE FROM business_subsectors WHERE id= 621399;
DELETE FROM business_subsectors WHERE id= 62141;
DELETE FROM business_subsectors WHERE id= 621410;
DELETE FROM business_subsectors WHERE id= 62142;
DELETE FROM business_subsectors WHERE id= 621420;
DELETE FROM business_subsectors WHERE id= 62149;
DELETE FROM business_subsectors WHERE id= 621491;
DELETE FROM business_subsectors WHERE id= 621492;
DELETE FROM business_subsectors WHERE id= 621493;
DELETE FROM business_subsectors WHERE id= 621498;
DELETE FROM business_subsectors WHERE id= 62151;
DELETE FROM business_subsectors WHERE id= 621511;
DELETE FROM business_subsectors WHERE id= 621512;
DELETE FROM business_subsectors WHERE id= 62161;
DELETE FROM business_subsectors WHERE id= 621610;
DELETE FROM business_subsectors WHERE id= 62191;
DELETE FROM business_subsectors WHERE id= 621910;
DELETE FROM business_subsectors WHERE id= 62199;
DELETE FROM business_subsectors WHERE id= 621991;
DELETE FROM business_subsectors WHERE id= 621999;
DELETE FROM business_subsectors WHERE id= 62211;
DELETE FROM business_subsectors WHERE id= 622110;
DELETE FROM business_subsectors WHERE id= 62221;
DELETE FROM business_subsectors WHERE id= 622210;
DELETE FROM business_subsectors WHERE id= 62231;
DELETE FROM business_subsectors WHERE id= 622310;
DELETE FROM business_subsectors WHERE id= 62311;
DELETE FROM business_subsectors WHERE id= 623110;
DELETE FROM business_subsectors WHERE id= 62321;
DELETE FROM business_subsectors WHERE id= 623210;
DELETE FROM business_subsectors WHERE id= 62322;
DELETE FROM business_subsectors WHERE id= 623220;
DELETE FROM business_subsectors WHERE id= 62331;
DELETE FROM business_subsectors WHERE id= 623311;
DELETE FROM business_subsectors WHERE id= 623312;
DELETE FROM business_subsectors WHERE id= 62399;
DELETE FROM business_subsectors WHERE id= 623990;
DELETE FROM business_subsectors WHERE id= 62411;
DELETE FROM business_subsectors WHERE id= 624110;
DELETE FROM business_subsectors WHERE id= 62412;
DELETE FROM business_subsectors WHERE id= 624120;
DELETE FROM business_subsectors WHERE id= 62419;
DELETE FROM business_subsectors WHERE id= 624190;
DELETE FROM business_subsectors WHERE id= 62421;
DELETE FROM business_subsectors WHERE id= 624210;
DELETE FROM business_subsectors WHERE id= 62422;
DELETE FROM business_subsectors WHERE id= 624221;
DELETE FROM business_subsectors WHERE id= 624229;
DELETE FROM business_subsectors WHERE id= 62423;
DELETE FROM business_subsectors WHERE id= 624230;
DELETE FROM business_subsectors WHERE id= 62431;
DELETE FROM business_subsectors WHERE id= 624310;
DELETE FROM business_subsectors WHERE id= 62441;
DELETE FROM business_subsectors WHERE id= 624410;
DELETE FROM business_subsectors WHERE id= 71111;
DELETE FROM business_subsectors WHERE id= 711110;
DELETE FROM business_subsectors WHERE id= 71112;
DELETE FROM business_subsectors WHERE id= 711120;
DELETE FROM business_subsectors WHERE id= 71113;
DELETE FROM business_subsectors WHERE id= 711130;
DELETE FROM business_subsectors WHERE id= 71119;
DELETE FROM business_subsectors WHERE id= 711190;
DELETE FROM business_subsectors WHERE id= 71121;
DELETE FROM business_subsectors WHERE id= 711211;
DELETE FROM business_subsectors WHERE id= 711212;
DELETE FROM business_subsectors WHERE id= 711219;
DELETE FROM business_subsectors WHERE id= 71131;
DELETE FROM business_subsectors WHERE id= 711310;
DELETE FROM business_subsectors WHERE id= 71132;
DELETE FROM business_subsectors WHERE id= 711320;
DELETE FROM business_subsectors WHERE id= 71141;
DELETE FROM business_subsectors WHERE id= 711410;
DELETE FROM business_subsectors WHERE id= 71151;
DELETE FROM business_subsectors WHERE id= 711510;
DELETE FROM business_subsectors WHERE id= 71211;
DELETE FROM business_subsectors WHERE id= 712110;
DELETE FROM business_subsectors WHERE id= 71212;
DELETE FROM business_subsectors WHERE id= 712120;
DELETE FROM business_subsectors WHERE id= 71213;
DELETE FROM business_subsectors WHERE id= 712130;
DELETE FROM business_subsectors WHERE id= 71219;
DELETE FROM business_subsectors WHERE id= 712190;
DELETE FROM business_subsectors WHERE id= 71311;
DELETE FROM business_subsectors WHERE id= 713110;
DELETE FROM business_subsectors WHERE id= 71312;
DELETE FROM business_subsectors WHERE id= 713120;
DELETE FROM business_subsectors WHERE id= 71321;
DELETE FROM business_subsectors WHERE id= 713210;
DELETE FROM business_subsectors WHERE id= 71329;
DELETE FROM business_subsectors WHERE id= 713290;
DELETE FROM business_subsectors WHERE id= 71391;
DELETE FROM business_subsectors WHERE id= 713910;
DELETE FROM business_subsectors WHERE id= 71392;
DELETE FROM business_subsectors WHERE id= 713920;
DELETE FROM business_subsectors WHERE id= 71393;
DELETE FROM business_subsectors WHERE id= 713930;
DELETE FROM business_subsectors WHERE id= 71394;
DELETE FROM business_subsectors WHERE id= 713940;
DELETE FROM business_subsectors WHERE id= 71395;
DELETE FROM business_subsectors WHERE id= 713950;
DELETE FROM business_subsectors WHERE id= 71399;
DELETE FROM business_subsectors WHERE id= 713990;
DELETE FROM business_subsectors WHERE id= 72111;
DELETE FROM business_subsectors WHERE id= 721110;
DELETE FROM business_subsectors WHERE id= 72112;
DELETE FROM business_subsectors WHERE id= 721120;
DELETE FROM business_subsectors WHERE id= 72119;
DELETE FROM business_subsectors WHERE id= 721191;
DELETE FROM business_subsectors WHERE id= 721199;
DELETE FROM business_subsectors WHERE id= 72121;
DELETE FROM business_subsectors WHERE id= 721211;
DELETE FROM business_subsectors WHERE id= 721214;
DELETE FROM business_subsectors WHERE id= 72131;
DELETE FROM business_subsectors WHERE id= 721310;
DELETE FROM business_subsectors WHERE id= 72231;
DELETE FROM business_subsectors WHERE id= 722310;
DELETE FROM business_subsectors WHERE id= 72232;
DELETE FROM business_subsectors WHERE id= 722320;
DELETE FROM business_subsectors WHERE id= 72233;
DELETE FROM business_subsectors WHERE id= 722330;
DELETE FROM business_subsectors WHERE id= 72241;
DELETE FROM business_subsectors WHERE id= 722410;
DELETE FROM business_subsectors WHERE id= 72251;
DELETE FROM business_subsectors WHERE id= 722511;
DELETE FROM business_subsectors WHERE id= 722513;
DELETE FROM business_subsectors WHERE id= 722514;
DELETE FROM business_subsectors WHERE id= 722515;
DELETE FROM business_subsectors WHERE id= 81111;
DELETE FROM business_subsectors WHERE id= 811111;
DELETE FROM business_subsectors WHERE id= 811112;
DELETE FROM business_subsectors WHERE id= 811113;
DELETE FROM business_subsectors WHERE id= 811118;
DELETE FROM business_subsectors WHERE id= 81112;
DELETE FROM business_subsectors WHERE id= 811121;
DELETE FROM business_subsectors WHERE id= 811122;
DELETE FROM business_subsectors WHERE id= 81119;
DELETE FROM business_subsectors WHERE id= 811191;
DELETE FROM business_subsectors WHERE id= 811192;
DELETE FROM business_subsectors WHERE id= 811198;
DELETE FROM business_subsectors WHERE id= 81121;
DELETE FROM business_subsectors WHERE id= 811210;
DELETE FROM business_subsectors WHERE id= 811211;
DELETE FROM business_subsectors WHERE id= 811212;
DELETE FROM business_subsectors WHERE id= 811213;
DELETE FROM business_subsectors WHERE id= 811219;
DELETE FROM business_subsectors WHERE id= 81131;
DELETE FROM business_subsectors WHERE id= 811310;
DELETE FROM business_subsectors WHERE id= 81141;
DELETE FROM business_subsectors WHERE id= 811411;
DELETE FROM business_subsectors WHERE id= 811412;
DELETE FROM business_subsectors WHERE id= 81142;
DELETE FROM business_subsectors WHERE id= 811420;
DELETE FROM business_subsectors WHERE id= 81143;
DELETE FROM business_subsectors WHERE id= 811430;
DELETE FROM business_subsectors WHERE id= 81149;
DELETE FROM business_subsectors WHERE id= 811490;
DELETE FROM business_subsectors WHERE id= 81211;
DELETE FROM business_subsectors WHERE id= 812111;
DELETE FROM business_subsectors WHERE id= 812112;
DELETE FROM business_subsectors WHERE id= 812113;
DELETE FROM business_subsectors WHERE id= 81219;
DELETE FROM business_subsectors WHERE id= 812191;
DELETE FROM business_subsectors WHERE id= 812199;
DELETE FROM business_subsectors WHERE id= 81221;
DELETE FROM business_subsectors WHERE id= 812210;
DELETE FROM business_subsectors WHERE id= 81222;
DELETE FROM business_subsectors WHERE id= 812220;
DELETE FROM business_subsectors WHERE id= 81231;
DELETE FROM business_subsectors WHERE id= 812310;
DELETE FROM business_subsectors WHERE id= 81232;
DELETE FROM business_subsectors WHERE id= 812320;
DELETE FROM business_subsectors WHERE id= 81233;
DELETE FROM business_subsectors WHERE id= 812331;
DELETE FROM business_subsectors WHERE id= 812332;
DELETE FROM business_subsectors WHERE id= 81291;
DELETE FROM business_subsectors WHERE id= 812910;
DELETE FROM business_subsectors WHERE id= 81292;
DELETE FROM business_subsectors WHERE id= 812921;
DELETE FROM business_subsectors WHERE id= 812922;
DELETE FROM business_subsectors WHERE id= 81293;
DELETE FROM business_subsectors WHERE id= 812930;
DELETE FROM business_subsectors WHERE id= 81299;
DELETE FROM business_subsectors WHERE id= 812990;
DELETE FROM business_subsectors WHERE id= 81311;
DELETE FROM business_subsectors WHERE id= 813110;
DELETE FROM business_subsectors WHERE id= 81321;
DELETE FROM business_subsectors WHERE id= 813211;
DELETE FROM business_subsectors WHERE id= 813212;
DELETE FROM business_subsectors WHERE id= 813219;
DELETE FROM business_subsectors WHERE id= 81331;
DELETE FROM business_subsectors WHERE id= 813311;
DELETE FROM business_subsectors WHERE id= 813312;
DELETE FROM business_subsectors WHERE id= 813319;
DELETE FROM business_subsectors WHERE id= 81341;
DELETE FROM business_subsectors WHERE id= 813410;
DELETE FROM business_subsectors WHERE id= 81391;
DELETE FROM business_subsectors WHERE id= 813910;
DELETE FROM business_subsectors WHERE id= 81392;
DELETE FROM business_subsectors WHERE id= 813920;
DELETE FROM business_subsectors WHERE id= 81393;
DELETE FROM business_subsectors WHERE id= 813930;
DELETE FROM business_subsectors WHERE id= 81394;
DELETE FROM business_subsectors WHERE id= 813940;
DELETE FROM business_subsectors WHERE id= 81399;
DELETE FROM business_subsectors WHERE id= 813990;
DELETE FROM business_subsectors WHERE id= 81411;
DELETE FROM business_subsectors WHERE id= 814110;
DELETE FROM business_subsectors WHERE id= 92111;
DELETE FROM business_subsectors WHERE id= 921110;
DELETE FROM business_subsectors WHERE id= 92112;
DELETE FROM business_subsectors WHERE id= 921120;
DELETE FROM business_subsectors WHERE id= 92113;
DELETE FROM business_subsectors WHERE id= 921130;
DELETE FROM business_subsectors WHERE id= 92114;
DELETE FROM business_subsectors WHERE id= 921140;
DELETE FROM business_subsectors WHERE id= 92115;
DELETE FROM business_subsectors WHERE id= 921150;
DELETE FROM business_subsectors WHERE id= 92119;
DELETE FROM business_subsectors WHERE id= 921190;
DELETE FROM business_subsectors WHERE id= 92211;
DELETE FROM business_subsectors WHERE id= 922110;
DELETE FROM business_subsectors WHERE id= 92212;
DELETE FROM business_subsectors WHERE id= 922120;
DELETE FROM business_subsectors WHERE id= 92213;
DELETE FROM business_subsectors WHERE id= 922130;
DELETE FROM business_subsectors WHERE id= 92214;
DELETE FROM business_subsectors WHERE id= 922140;
DELETE FROM business_subsectors WHERE id= 92215;
DELETE FROM business_subsectors WHERE id= 922150;
DELETE FROM business_subsectors WHERE id= 92216;
DELETE FROM business_subsectors WHERE id= 922160;
DELETE FROM business_subsectors WHERE id= 92219;
DELETE FROM business_subsectors WHERE id= 922190;
DELETE FROM business_subsectors WHERE id= 92311;
DELETE FROM business_subsectors WHERE id= 923110;
DELETE FROM business_subsectors WHERE id= 92312;
DELETE FROM business_subsectors WHERE id= 923120;
DELETE FROM business_subsectors WHERE id= 92313;
DELETE FROM business_subsectors WHERE id= 923130;
DELETE FROM business_subsectors WHERE id= 92314;
DELETE FROM business_subsectors WHERE id= 923140;
DELETE FROM business_subsectors WHERE id= 92411;
DELETE FROM business_subsectors WHERE id= 924110;
DELETE FROM business_subsectors WHERE id= 92412;
DELETE FROM business_subsectors WHERE id= 924120;
DELETE FROM business_subsectors WHERE id= 92511;
DELETE FROM business_subsectors WHERE id= 925110;
DELETE FROM business_subsectors WHERE id= 92512;
DELETE FROM business_subsectors WHERE id= 925120;
DELETE FROM business_subsectors WHERE id= 92611;
DELETE FROM business_subsectors WHERE id= 926110;
DELETE FROM business_subsectors WHERE id= 92612;
DELETE FROM business_subsectors WHERE id= 926120;
DELETE FROM business_subsectors WHERE id= 92613;
DELETE FROM business_subsectors WHERE id= 926130;
DELETE FROM business_subsectors WHERE id= 92614;
DELETE FROM business_subsectors WHERE id= 926140;
DELETE FROM business_subsectors WHERE id= 92615;
DELETE FROM business_subsectors WHERE id= 926150;
DELETE FROM business_subsectors WHERE id= 92711;
DELETE FROM business_subsectors WHERE id= 927110;
DELETE FROM business_subsectors WHERE id= 92811;
DELETE FROM business_subsectors WHERE id= 928110;
DELETE FROM business_subsectors WHERE id= 92812;
DELETE FROM business_subsectors WHERE id= 928120;`);
  }
}
