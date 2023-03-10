/* eslint-disable react/prop-types */
import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./Home/Home.jsx";
import ErrorComponent from "./ErrorComponent";
import Login from "./login/Login";
import CreateAccountContainer from "./createAccount/CreateAccountContainer.jsx";
import AllBooks from "./Books/AllBooks.jsx";
import SingleProduct from "./SingleProduct/SingleProduct.jsx";
import UserPage from "./UserPage/UserPage.jsx";
import EditUser from "./UserPage/EditUser.jsx";
import CompletedOrder from "./Orders/CompletedOrder.jsx";

import AdminHomepage from "./admin/AdminHomepage.jsx";
// import AdminOrdersPage from "./admin/AdminOrdersPage";
import AdminBooksPage from "./admin/AdminBooksPage";
import AdminUsersPage from "./admin/AdminUsersPage";
// import AdminReviewsPage from "./admin/AdminReviewsPage";
import AdminBookEdit from "./admin/AdminBookEdit.jsx";
import AdminBookAdd from "./admin/AdminBookAdd.jsx";
import AdminUserview from "./admin/AdminUserview.jsx";

function RouteContainer({ user }) {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<AllBooks />} />
        <Route path="/books/:id" element={<SingleProduct />} />

        {/* These routes are exposed to all because, if we hid them, will briefly show 404 */}
        <Route path="/createaccount" element={<CreateAccountContainer />} />
        <Route path="/login" element={<Login />} />

        {/*only logged in user will be able to access my account and account edit page */}
        {user.id && <Route path="/myAccount" element={<UserPage />} />}
        {user.id && (
          <Route path="completedOrder" element={<CompletedOrder />} />
        )}

        {user.id && <Route path="/edit" element={<EditUser />} />}

        {user.isAdmin && (
          <>
            <Route path="/admin" element={<AdminHomepage />} />
            <Route path="/admin/users" element={<AdminUsersPage />} />
            <Route path="/admin/users/:id" element={<AdminUserview />} />
            <Route path="/admin/books" element={<AdminBooksPage />} />
            <Route path="/admin/books/:id" element={<AdminBookEdit />} />
            <Route path="/admin/books/add" element={<AdminBookAdd />} />
            {/* Not implemented yet, so commented out: */}
            {/* <Route path="/admin/reviews" element={<AdminReviewsPage />} />
            <Route path="/admin/orders" element={<AdminOrdersPage />} /> */}
          </>
        )}

        <Route path="/404" element={<ErrorComponent />} />
        <Route path="/*" element={<ErrorComponent />} />
      </Routes>
    </div>
  );
}

export default RouteContainer;
