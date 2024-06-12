import React, { useState } from 'react';
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBInput,
  MDBBtn
} from 'mdb-react-ui-kit';
import './profile.css'; // Import the CSS styles

export default function ProfilePage() {
  const [showEdit, setShowEdit] = useState(false);

  const toggleEditForm = () => {
    setShowEdit(!showEdit);
  };

  return (
    <section>
      <MDBContainer className="py-5">
        <MDBRow>
        </MDBRow>

        <MDBRow>
        {showEdit && (
            <MDBCol lg="">
              <MDBCard className="mb">
                <MDBCardBody>
                  <h5 className="mb-4">تحديث البيانات</h5>
                  <MDBInput label="رقم الهاتف" id='phone' type='text' className='mb-4' />
                  <MDBInput label="العنوان" id='address' type='text' className='mb-4' />
                  <MDBInput label="هاتف الزوج" id='husbandPhone' type='text' className='mb-4' />
                  <MDBInput label="كلمة المرور" id='password' type='password' className='mb-4' />
                  <MDBInput label="كلمة المرور" id='password' type='password' className='mb-4' />
                  <MDBBtn>تحديث</MDBBtn>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          )}
          <MDBCol lg="8">
            <MDBCard className="mb-4">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted"> هديل الاحمد</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="3">
                    <MDBCardText>الاسم الكامل</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">1234567890</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="3">
                    <MDBCardText>رقم الهوية</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">(097) 234-5678</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="3">
                    <MDBCardText>الهاتف</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">  الخليل </MDBCardText>
                  </MDBCol>
                  <MDBCol sm="3">
                    <MDBCardText>العنوان</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">أحمد محمود</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="3">
                    <MDBCardText>اسم الزوج</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">(098) 765-4321</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="3">
                    <MDBCardText>هاتف الزوج</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow className="mb-0">
                  <MDBCol>
                    <MDBBtn onClick={toggleEditForm}>تعديل البيانات</MDBBtn>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>

        </MDBRow>
      </MDBContainer>
    </section>
  );
}
