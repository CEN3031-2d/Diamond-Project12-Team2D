import React, { useState } from 'react';
import { Table, Input, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import TeacherCreator from "./TeacherCreator/TeacherCreator";
import FacultyUpload from "./TeacherCreator/FacultyUpload";
import TeacherEditor from "./TeacherEditor";

export default function TeacherTab({teacherList, page, setPage}) {

  const teacherColumns = [
    {
      title: 'First Name',
      dataIndex: 'first_name',
      key: 'firstName',
      editable: true,
      width: '22.5%',
      align: 'left',
    },
    {
      title: 'Last Name',
      dataIndex: 'last_name',
      key: 'lastName',
      editable: true,
      width: '22.5%',
      align: 'left',
      // Apply filter directly on this column
      onFilter: (value, record) =>
        record.last_name.toLowerCase().includes(value.toLowerCase()),
      // Add search functionality for this column
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Search Last Name"
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => confirm()}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
          />
          <Button
            type="primary"
            onClick={() => confirm()}
            size="small"
            style={{ width: 90, marginRight: 8 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters()}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </div>
      ),
    },
    {
      title: 'School',
      dataIndex: 'school',
      key: 'school',
      editable: true,
      width: '22.5%',
      align: 'left',
      render: (_, key) => (
        <span>
          {key.school != null ? key.school.name : <i>No school provided</i>}
        </span>
      ),
    },
    {
          title: 'Edit Teacher Details',
          dataIndex: 'view',
          key: 'view',
          width: '22.5%',
          align: 'left',
          render: (_, key) => (
            <TeacherEditor
              id={key.id}
              schoolList={schoolList}
              classroomList={classroomList}
              handleEditTeacher={handleEditTeacher}
            />)
      },
    {
      title: 'Edit Students',
      dataIndex: 'view',
      key: 'view',
      width: '22.5%',
      align: 'left',
      render: (_, teacher) => (
        <Button type="link" onClick={() => handleViewClasses(teacher.id)}>
          Edit Students
        </Button>
      ),
    },
  ];

  function handleViewClasses(teacherID){
    navigate(`/TeacherDashboard/${teacherID}`);
  }

  const navigate = useNavigate();
  
    return (
        <div>
            <div id='page-header'>
            <h1>
              Your Teachers
            </h1>
          </div>
          <div id='content-creator-table-container'>
            <div id='content-creator-btn-container'>
            <TeacherCreator
            TeacherList={teacherList}
            schoolList={schoolList}
            handleAddTeacher={handleAddTeacher}
          ></TeacherCreator>
             <FacultyUpload
             schoolList = {schoolList}
             handleAddTeacher={handleAddTeacher}
             ></FacultyUpload>
            </div>
            <Table
              columns = {teacherColumns}
              dataSource = {teacherList}
              rowClassName = 'editable-row'
              rowKey = 'id'
              onChange = {(Pagination) => {
                setPage(Pagination.current);
                setSearchParams({tab, page: Pagination.current});
              }}
              pagination = {{current: page ? page : 1}}
            ></Table>
          </div>
        </div>
    );
}