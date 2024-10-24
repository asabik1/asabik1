import { LoanPurpose } from '../src/modules/investment-request/enum/loan-purpose.enum';
import { BusinessOwnerGetDetailedResponse } from '../src/modules/business-owner/models/business-owner-get-detailed-response.interface';
import { Rating } from '../src/modules/investment-request/enum/rating.enum';
import { INVESTMENT_REQUEST_STATUS } from '../src/modules/investment-request/enum/investment-status-message.enum';

export const businessOwnerGetDetailedResponse: BusinessOwnerGetDetailedResponse[] =
  [
    {
      imgUrl: '',
      companyName: 'Small Fishing Company',
      description:
        "Small Fishing Company is a dedicated and passionate team of fishing enthusiasts committed to bringing you the freshest and highest quality catch. With a focus on sustainable practices, we provide a diverse selection of responsibly sourced seafood. Whether you're a seasoned angler or simply enjoy the flavors of the ocean, our company is here to deliver a taste of the sea directly to your table.",
      ownerName: 'John Fisherman',
      businessSubsector: {
        id: 10101,
        name: 'Fishing',
        businessSector: {
          id: 1010,
          name: 'Fishing',
          business: {
            id: 10,
            name: 'Agriculture Forestry Fishing and Hunting',
          },
        },
      },
      startDate: '02/02/2019',
      avrMonthlySales: 20000,
      avrMonthlyNetProfit: 10000,
      totalLastYearNetProfit: 120000,
      employeesNo: 3,
      phone: '1234567890',
      website: 'johnfisherman.fish.com',
      adress: {
        city: 'Fishcity',
        street: 'Shark Street 1',
        zipcode: '12345',
      },
      investmentRequests: [
        {
          id: 2,
          purposeOfTheLoan: LoanPurpose.EquipmentPurchase,
          loanPurpose:
            'A Small Fishing Company is actively in pursuit of a loan to spearhead a transformative equipment upgrade. These funds will act as a vital catalyst in the modernization of our fishing operations, encompassing various critical aspects. We aim to enhance our vessels with state-of-the-art technology. By integrating modern navigation systems, communication equipment, and sustainable fishing practices, we can operate more efficiently and sustainably. This modernization not only improves catch rates but also reduces our environmental impact, aligning our practices with responsible and ethical fishing standards.',
          helpIncreaseProfit:
            'Securing a loan for our Small Fishing Company is an essential step toward revolutionizing our operations, with a direct impact on our profitability. The infusion of these funds will serve as a crucial catalyst for modernization, and this transformation will contribute significantly to our bottom line. One key area where we expect to see immediate profit benefits is through the enhancement of our vessels with cutting-edge technology. With modern navigation systems and communication equipment, our fleet will operate more efficiently, allowing us to reach fishing grounds faster and navigate with precision. This efficiency translates into increased catch rates, reducing the time spent at sea, and ultimately lowering operational costs. The result? A substantial boost in profitability as we maximize our catch while minimizing expenses.',
          profitIncrease: 1000,
          rating: Rating.Aaa,
          dti: '58.33%',
          projectedNetReturn: '12.500%',
          psr: '52.85%',
          status: INVESTMENT_REQUEST_STATUS.OPEN_INVESTOR_RESPONSE,
          expirationDate: '8/11/2023',
          returnTerm: 12,
          requiredCapital: 10000,
          amountToMeetTarget: 8000,
          netReturnToShare: 2000,
          numberOfInvestors: 1,
        },
      ],
    },
    {
      imgUrl: '',
      companyName: 'Big Shoemaking Company',
      description:
        "Big Shoemaking Company stands as a dedicated and skilled team of artisans, driven to craft footwear of unparalleled quality. With an unwavering commitment to excellence, we create a diverse array of shoes, thoughtfully designed and responsibly produced. Whether you're seeking timeless elegance or modern comfort, our company is devoted to adorning your every step with the artistry of exceptional shoemaking. From classic styles to contemporary trends, we are here to deliver a touch of sophistication right to your feet.",
      ownerName: 'Ann Shoemaker',
      businessSubsector: {
        id: 30303,
        name: 'Footwear Manufacturing',
        businessSector: {
          id: 3030,
          name: 'Footwear Manufacturing',
          business: {
            id: 30,
            name: 'Manufacturing',
          },
        },
      },
      startDate: '02/10/2010',
      avrMonthlySales: 150000,
      avrMonthlyNetProfit: 80000,
      totalLastYearNetProfit: 960000,
      employeesNo: 29,
      phone: '9876543210',
      website: 'shoes-from-ann.com',
      adress: {
        city: 'Shoe Valley',
        street: '99th Street',
        zipcode: '54321',
      },
      investmentRequests: [
        {
          id: 1,
          purposeOfTheLoan: LoanPurpose.ExpandBusiness,
          loanPurpose:
            "Leading Shoemaking Corporation is actively seeking a loan to drive our ambitious expansion plans. These funds will serve as a catalyst, amplifying our production capabilities, elevating design innovation, and facilitating market entry. We are embarking on a transformative journey that promises to reshape the landscape of shoemaking excellence. By joining forces with us, you'll have the opportunity to play a pivotal role in this exciting venture. Your partnership is not only appreciated but also vital to our continued success and growth. Our commitment to innovation goes beyond crafting exceptional footwear; it extends to building a sustainable future for our industry. With these funds, we aim to not only meet current demand but also set new standards for quality and style. Our vision is to become a global leader, and your support is a cornerstone of this vision.As we expand into new markets, your investment will help us reach customers worldwide, introducing them to the unparalleled craftsmanship and artistry that defines our brand. We believe that together, we can leave an indelible mark on the world of shoemaking, setting benchmarks for excellence that others can only aspire to achieve. Join us in this exciting chapter of our journey, where opportunities abound, and the future of shoemaking excellence is being defined. Your trust and collaboration will be a driving force behind our success as we stride confidently toward a brighter tomorrow.",
          helpIncreaseProfit:
            "The loan opportunity presented by Leading Shoemaking Corporation is poised to significantly enhance the company's profit potential. By providing the necessary financial support for our ambitious expansion plans, this loan will have a profound impact on our operations and, in turn, our profitability. Firstly, these funds will serve as a catalyst, allowing us to amplify our production capabilities. With increased production efficiency, we can meet growing demand more effectively, thereby maximizing revenue streams and profit margins. Secondly, the loan will enable us to elevate our design innovation. By investing in cutting-edge design technologies and talent, we anticipate creating footwear that not only attracts a wider customer base but also commands premium pricing, ultimately boosting our profit margins. Furthermore, as we venture into new markets with the help of this loan, we will tap into previously untapped revenue streams. Introducing our exceptional craftsmanship and artistry to a global audience will expand our customer base, further contributing to increased profits. In summary, this loan is a strategic investment that will empower Leading Shoemaking Corporation to grow its profitability by enhancing production efficiency, elevating design standards, and expanding its market reach. By supporting our transformative journey, investors can expect a strong potential for increased returns and a promising future for shoemaking excellence.",
          profitIncrease: 12000,
          rating: Rating.Aa1,
          dti: '60.29%',
          projectedNetReturn: '12.500%',
          psr: '26.20%',
          status: INVESTMENT_REQUEST_STATUS.CLOSED_INVESTOR_RESPONSE,
          expirationDate: '9/1/2023',
          returnTerm: 12,
          requiredCapital: 35000,
          amountToMeetTarget: 0,
          netReturnToShare: 9000,
          numberOfInvestors: 6,
        },
      ],
    },
  ];
