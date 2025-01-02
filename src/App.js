import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import {
	BrowserRouter as Router,
	Route,
	Routes,
	Navigate,
	useParams,
} from "react-router-dom";
import HomePage1 from "./Component/MainComponent/HomePage/Homepage";
import { ThemeProvider } from "./ThemeContext";
import Loginn from "./Component/MainComponent/Loginn/Login";
import Category_Maintenance from "./Component/File/Category_Maintenance/Category_Maintenance";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./Component/i18n.js";
import Account_Code_Maintenance from "./Component/File/Account_Code_Maintenance/Account_Code_Maintenance";
import Item_Maintenance from "./Component/File/Item_Maintenance/Item_Maintenance";
import Company_Maintenance from "../src/Component/File/Company_Maintenance/Company_Maintenance";
import Capacity_Maintenance from "./Component/File/Capacity_Maintenance/Capacity_Maintenance";
import Type_Maintenance from "./Component/File/Type_Maintenance/Type_Maintenance";
import UserMaintenance from "./Component/Utilities/UserManagement/UserManagement1.jsx";
import MenuUser from "./Component/Utilities/UserManagement/MenuUser/MenuUser.jsx";
import Layout from "./Component/MainComponent/Layout/Layout.js";
import AddUser1 from "./Component/Utilities/UserManagement/AddUser/AddUser.jsx";
import Customer from "./Component/MainComponent/Header/Admin/Customer.jsx";
import MenuAdmin from "./Component/MainComponent/Header/Admin/MenuAdmin/MenuAdmin.jsx";

//////////////////////////// List reports //////////////////////////////
import CompanyList from "./Component/Reports/Daily_Jobs_Reports/List/CompanyList.js";
import CategoryList from "./Component/Reports/Daily_Jobs_Reports/List/CategoryList.js";
import ChartofAccount from "./Component/Reports/Daily_Jobs_Reports/List/ChartofAccount.js";
import StoreList from "./Component/Reports/Daily_Jobs_Reports/List/StoreList.js";

//////////////////////////// ledger reports //////////////////////////////
import GeneralLedger from "./Component/Reports/Daily_Jobs_Reports/ledgers/GeneralLedger.js";
import SupplierLedger from "./Component/Reports/Daily_Jobs_Reports/ledgers/SupplierLedger.js";
import CustomerLedger from "./Component/Reports/Daily_Jobs_Reports/ledgers/CustomerLedger.js";
import BankRegisterLedger from "./Component/Reports/Daily_Jobs_Reports/ledgers/BankRegisterLedger.js";
import SupplierprogressReport from "./Component/Reports/Daily_Jobs_Reports/ledgers/SupplierprogressReport.js";
import ReceivableReport from "./Component/Reports/MiscReports/ReceivableReport.jsx";
import PayableReport from "./Component/Reports/MiscReports/PayableReport.jsx";
import InstallarPayableReport from "./Component/Reports/InstallationReports/InstallarPayableReport.jsx";
import DailyCashBankBalance from "./Component/Reports/DailyReports/DailyCashBankBalance.jsx";
import DailyCollectionReport from "./Component/Reports/DailyReports/DailyCollectionReport.jsx";
import ItemPurchaseSummary from "./Component/Reports/ItemReports/ItemPurchaseSummary.jsx";
import DailySaleReport from "./Component/Reports/DailyReports/DailySaleReport.jsx";
import DailyPurchaseReport from "./Component/Reports/DailyReports/DailyPurchaseReport.jsx";
import InstallarPaymentReport from "./Component/Reports/InstallationReports/InstallarPaymentReport.jsx";
import DailyPaymentReport from "./Component/Reports/DailyReports/DailyPaymentReport.jsx";
import DailyInstallationReport from "./Component/Reports/InstallationReports/DailyInstallationReport.jsx";
import InstallarBalanceReport from "./Component/Reports/InstallationReports/InstallarBalanceReport.jsx";
import DailyStatusReport from "./Component/Reports/DailyReports/DailyStatusReport.jsx";
import ReceivableAging from "./Component/Reports/MiscReports/ReceivableAging.jsx";
import PayableAging from "./Component/Reports/MiscReports/PayableAging.jsx";
import SupplierPurchaseReport from "./Component/Reports/ItemReports/SupplierPurchaseReport.jsx";
import CustomerSaleReport from "./Component/Reports/ItemReports/CustomerSaleReport.jsx";
import SupplierActivity from "./Component/Reports/ItemReports/SupplierActivity.jsx";
import CustomerActivity from "./Component/Reports/ItemReports/CustomerActivity.jsx";
import SupplierPurchaseComparison from "./Component/Reports/ItemReports/SupplierPurchaseComparison.jsx";
import CustomerSaleComparison from "./Component/Reports/ItemReports/CustomerSaleComparison.jsx";
import ItemSaleSummary from "./Component/Reports/ItemReports/ItemSaleSummary.jsx";
import ItemSaleReport from "./Component/Reports/ItemReports/ItemSaleReport.jsx";
import ItemPurchaseReport from "./Component/Reports/ItemReports/ItemPurchaseReport.jsx";
import ItemSaleComparison from "./Component/Reports/ItemReports/ItemSaleComparison.jsx";
import CompanySaleComparison from "./Component/Reports/ItemReports/CompanySaleComparison.jsx";
import ItemPurchaseComparison from "./Component/Reports/ItemReports/ItemPurchaseComparison.jsx";
import CompanyPurchaseComparison from "./Component/Reports/ItemReports/CompanyPurchaseComparison.jsx";
import ItemMonthlySaleComparison from "./Component/Reports/ItemReports/ItemMonthlySaleComparison.jsx";
import ItemMonthlyPurchaseComparison from "./Component/Reports/ItemReports/ItemMonthlyPurchaseComparison.jsx";
import CompanyMonthlySaleComparison from "./Component/Reports/ItemReports/CompanyMonthlySaleComparison.jsx";
import CompanyMonthlyPurchaseComparison from "./Component/Reports/ItemReports/CompanyMonthlyPurchaseComparison.jsx";
import MonthlyPurchaseComparison from "./Component/Reports/ItemReports/MonthlyPurchaseComparison.jsx";
import MonthlySaleComparison from "./Component/Reports/ItemReports/MonthlySaleComparison.jsx";
import EmployeeSaleReport from "./Component/Reports/EmployeeReports/EmployeeSaleReport.jsx";
import EmployeeSaleSummary from "./Component/Reports/EmployeeReports/EmployeeSaleSummary.jsx";
import EmployeeSaleComparison from "./Component/Reports/EmployeeReports/EmployeeSaleComparison.jsx";
import EmployeeAdvanceReport from "./Component/Reports/EmployeeReports/EmployeeAdvanceReport.jsx";
import EmployeeMarginReport from "./Component/Reports/EmployeeReports/EmployeeMarginReport.jsx";
import EmployeeMarginComparison from "./Component/Reports/EmployeeReports/EmployeeMarginComparison.jsx";
import EmployeeMarginSummary from "./Component/Reports/EmployeeReports/EmployeeMarginSummary.jsx";
import CustomerMaintenance from "./Component/File/Customer_Maintenance/CustomerMaintenance.jsx";
import EmployeeCommissionReport from "./Component/Reports/EmployeeReports/EmployeeCommissionReport.jsx";
import EmployeeCommissionSummary from "./Component/Reports/EmployeeReports/EmployeeCommissionSummary.jsx";
import EmployeeCommissionComparison from "./Component/Reports/EmployeeReports/EmployeeCommissionComparison.jsx";

function App() {
	const queryClient = new QueryClient();

	const globadata = {
		tableTopColor: "#3368B5",
		tableHeadColor: "#C6DAF7",
		headerColor: "#D9DADF",
		secondaryColor: "#F5F5F5",
		textColor: "#fff",
		btnColor: "#3368B5",
		apiLink: "https://crystalsolutions.com.pk/emart/web",
	};

	return (
		<div style={{ backgroundColor: "white", minHeight: "100vh" }}>
			<Router basename="/crystalsol">
				<ThemeProvider>
					<QueryClientProvider client={queryClient}>
						<Routes>
							<Route exact path="/" element={<Loginn />} />
							<Route exact path="/login" element={<Loginn />} />
							<Route element={<Layout />}>
								{/* All pages with the sidebar */}
								<Route exact path="/MainPage" element={<HomePage1 />} />
								<Route
									exact
									path="/AccountCodeMaintenance"
									element={<Account_Code_Maintenance />}
								/>
								<Route
									exact
									path="/CustomerMaintenance"
									element={<CustomerMaintenance />}
								/>
								<Route
									exact
									path="/ItemMaintenance"
									element={<Item_Maintenance />}
								/>

								<Route exact path="/Customer" element={<Customer />} />
								<Route exact path="/MenuAdmin" element={<MenuAdmin />} />
								<Route
									exact
									path="/CompanyMaintenance"
									element={<Company_Maintenance />}
								/>
								<Route
									exact
									path="/TypeMaintenance"
									element={<Type_Maintenance />}
								/>
								<Route
									exact
									path="/CategoryMaintenance"
									element={<Category_Maintenance />}
								/>
								<Route
									exact
									path="/CapacityMaintenance"
									element={<Capacity_Maintenance />}
								/>
								<Route
									exact
									path="/UserManagement"
									element={<UserMaintenance />}
								/>

								{/* Rountes for List reports */}
								<Route exact path="/CompanyList" element={<CompanyList />} />
								<Route exact path="/CategoryList" element={<CategoryList />} />
								<Route
									exact
									path="/CharofAccount"
									element={<ChartofAccount />}
								/>
								<Route exact path="/StoreList" element={<StoreList />} />

								{/* Rountes for ledgers reports */}
								<Route
									exact
									path="/GeneralLedger1"
									element={<GeneralLedger />}
								/>
								<Route
									exact
									path="/SupplierLedger"
									element={<SupplierLedger />}
								/>
								<Route
									exact
									path="/CustomerLedger"
									element={<CustomerLedger />}
								/>
								<Route
									exact
									path="/BankRegister"
									element={<BankRegisterLedger />}
								/>
								<Route
									exact
									path="/SupplieProgress"
									element={<SupplierprogressReport />}
								/>

								<Route exact path="/MenuUser/:tusrid" element={<MenuUser />} />
								<Route exact path="/AddUser1" element={<AddUser1 />} />

								{/* Daily Reports */}
								<Route
									exact
									path="DailyCollectionReport"
									element={<DailyCollectionReport />}
								/>
								<Route
									exact
									path="DailyPaymentReport"
									element={<DailyPaymentReport />}
								/>
								<Route
									exact
									path="/Cash&BankBalance"
									element={<DailyCashBankBalance />}
								/>
								<Route exact path="/SaleReport" element={<DailySaleReport />} />
								<Route
									exact
									path="/PurchaseReport"
									element={<DailyPurchaseReport />}
								/>
								<Route
									exact
									path="/DailyStatusReport"
									element={<DailyStatusReport />}
								/>

								{/* Misc Reports */}
								<Route
									exact
									path="/ReceivableReport"
									element={<ReceivableReport />}
								/>
								<Route
									exact
									path="/PayableReport"
									element={<PayableReport />}
								/>
								<Route
									exact
									path="/ReceivableAging"
									element={<ReceivableAging />}
								/>
								<Route exact path="/PayableAging" element={<PayableAging />} />

								{/* Installation Reports */}
								<Route
									exact
									path="/InstallarPayableReport"
									element={<InstallarPayableReport />}
								/>
								<Route
									exact
									path="/InstallarPaymentReport"
									element={<InstallarPaymentReport />}
								/>
								<Route
									exact
									path="/DailyInstallationReport"
									element={<DailyInstallationReport />}
								/>
								<Route
									exact
									path="/InstallarBalanceReport"
									element={<InstallarBalanceReport />}
								/>

								{/* Item Reports */}

								<Route
									exact
									path="/ItemSaleSummary"
									element={<ItemSaleSummary />}
								/>
								<Route
									exact
									path="/ItemSaleReport"
									element={<ItemSaleReport />}
								/>
								<Route
									exact
									path="/ItemPurchaseSummary"
									element={<ItemPurchaseSummary />}
								/>
								<Route
									exact
									path="/ItemPurchaseReport"
									element={<ItemPurchaseReport />}
								/>
								<Route
									exact
									path="/SupplierPurchaseReport"
									element={<SupplierPurchaseReport />}
								/>
								<Route
									exact
									path="/CustomerSaleReport"
									element={<CustomerSaleReport />}
								/>
								<Route
									exact
									path="/SupplierActivity"
									element={<SupplierActivity />}
								/>
								<Route
									exact
									path="/CustomerActivity"
									element={<CustomerActivity />}
								/>
								<Route
									exact
									path="/SupplierPurchaseComparison"
									element={<SupplierPurchaseComparison />}
								/>
								<Route
									exact
									path="/CustomerSaleComparison"
									element={<CustomerSaleComparison />}
								/>
								<Route
									exact
									path="/ItemSaleComparison"
									element={<ItemSaleComparison />}
								/>
								<Route
									exact
									path="/ItemPurchaseComparison"
									element={<ItemPurchaseComparison />}
								/>
								<Route
									exact
									path="/CompanySaleComparison"
									element={<CompanySaleComparison />}
								/>
								<Route
									exact
									path="/CompanyPurchaseComparison"
									element={<CompanyPurchaseComparison />}
								/>
								<Route
									exact
									path="/ItemMonthlySaleComparison"
									element={<ItemMonthlySaleComparison />}
								/>
								<Route
									exact
									path="/ItemMonthlyPurchaseComparison"
									element={<ItemMonthlyPurchaseComparison />}
								/>
								<Route
									exact
									path="/CompanyMonthlySaleComparison"
									element={<CompanyMonthlySaleComparison />}
								/>
								<Route
									exact
									path="/CompanyMonthlyPurchaseComparison"
									element={<CompanyMonthlyPurchaseComparison />}
								/>
								<Route
									exact
									path="/MonthlySaleComparison"
									element={<MonthlySaleComparison />}
								/>
								<Route
									exact
									path="/MonthlyPurchaseComparison"
									element={<MonthlyPurchaseComparison />}
								/>

								{/* Employee Reports */}
								<Route
									exact
									path="/EmployeeSaleReport"
									element={<EmployeeSaleReport />}
								/>
								<Route
									exact
									path="/EmployeeSaleSummary"
									element={<EmployeeSaleSummary />}
								/>
								<Route
									exact
									path="/EmployeeSaleComparison"
									element={<EmployeeSaleComparison />}
								/>
								<Route
									exact
									path="/EmployeeAdvanceReport"
									element={<EmployeeAdvanceReport />}
								/>
								<Route
									exact
									path="/EmployeeMarginReport"
									element={<EmployeeMarginReport />}
								/>
								<Route
									exact
									path="/EmployeeMarginComparison"
									element={<EmployeeMarginComparison />}
								/>
								<Route
									exact
									path="/EmployeeMarginSummary"
									element={<EmployeeMarginSummary />}
								/>
								<Route
									exact
									path="/EmployeeCommissionReport"
									element={<EmployeeCommissionReport />}
								/>
								<Route
									exact
									path="/EmployeeCommissionSummary"
									element={<EmployeeCommissionSummary />}
								/>
								<Route
									exact
									path="/EmployeeCommissionComparison"
									element={<EmployeeCommissionComparison />}
								/>
							</Route>
						</Routes>
					</QueryClientProvider>
				</ThemeProvider>
			</Router>
		</div>
	);
}

export default App;
