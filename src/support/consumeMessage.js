const { CONSUMER_TOPICS } = require('../constant/kafkaConstant');
const {
  onBoardManager,
} = require('../v1/components/managerManagement/managerManagement.consumer');
const {
  onBoardDriver,
  onResign,
  requestChangeDriverProfile,
  requestConsignmentReject,
  requestAdditionalService,
  driverProblem,
  requestCustomerUserBankEdit,
  requestWalletTopUp,
} = require('../v1/components/driverManagement/driverManagement.consumer');
const {
  onBoardTruck,
} = require('../v1/components/truckManagement/truckManagement.consumer');
const {
  onBoardTrailer,
} = require('../v1/components/trailerManagement/trailerManagement.consumer');
const {
  createConsignment,
} = require('../v1/components/consignmentManagement/consignmentManagement.consumer');
const {
  providerTransactionInvoice,
  providerTransactionService,
} = require('../v1/components/providerTransactions/providerTransactions.consumer');

const {
  onBoardOperator,
  onBoardProviderManager,
  providerRaisedRequest,
} = require('../v1/components/provider/provider.consumer');

module.exports = ({ topic, data }) => {
  try {
    switch (topic) {
      case CONSUMER_TOPICS.POST:
        break;
      case CONSUMER_TOPICS.ONBOARD_CUSTOMER_SUCCESS:
        console.log('Data received', data);
        break;
      case CONSUMER_TOPICS.ONBOARD_MANAGER:
        onBoardManager(data);
        break;
      case CONSUMER_TOPICS.ONBOARD_DRIVER:
        onBoardDriver(data);
        break;
      case CONSUMER_TOPICS.ONBOARD_TRUCK:
        onBoardTruck(data);
        break;
      case CONSUMER_TOPICS.ONBOARD_TRAILER:
        onBoardTrailer(data);
        break;
      case CONSUMER_TOPICS.ONBOARD_PROVIDER_MANAGER:
        onBoardProviderManager(data);
        break;
      case CONSUMER_TOPICS.ONBOARD_OPERATOR:
        onBoardOperator(data);
        break;
      case CONSUMER_TOPICS.TRANSACTION_PROVIDER_INVOICE:
        providerTransactionInvoice(data);
        break;
      case CONSUMER_TOPICS.TRANSACTION_PROVIDER_SERVICE:
        providerTransactionService(data);
        break;
      case CONSUMER_TOPICS.CREATE_CONSIGNMENT:
        createConsignment(data);
        break;
      case CONSUMER_TOPICS.RESIGN:
        onResign(data);
        break;
      case CONSUMER_TOPICS.DRIVER_UPDATE_INFORMATION:
        requestChangeDriverProfile(data);
        break;
      case CONSUMER_TOPICS.REJECT_CONSIGNMENT:
        requestConsignmentReject(data);
        break;
      case CONSUMER_TOPICS.ADDTIONAL_SERVICE_REQUEST:
        requestAdditionalService(data);
        break;
      case CONSUMER_TOPICS.REPORT_PROBLEM:
        driverProblem(data);
        break;
      case CONSUMER_TOPICS.CUSTOMER_USER_BANK_EDIT_REQUEST:
        requestCustomerUserBankEdit(data);
        break;
      case CONSUMER_TOPICS.WALLET_TOPUP:
        requestWalletTopUp(data);
        break;
      case CONSUMER_TOPICS.RAISED_REQUEST:
        providerRaisedRequest(data);
        break;
      default:
        log.error(`Topic not Matched`);
        break;
    }
  } catch (error) {
    console.log(error);
  }
};
