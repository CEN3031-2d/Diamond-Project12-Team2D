import React from "react";
import { Table, Input, Button } from "antd"
import { useNavigate } from 'react-router-dom';
import ClassroomCreator from "./ClassroomCreator/ClassroomCreator";
import ClassroomEditor from "./ClassroomEditor";

export default function ClassroomTab({classroomList, gradeList, schoolList, mentorList, studentList, page, setPage, handleAddClassroom, handleEditClassroom}) {
  const classroomColumns = [
    {
      title: 'Classroom Name',
      dataIndex: 'name',
      key: 'name',
      editable: true,
      width: '22.5%',
      align: 'left',
      sorter: {
        compare: (a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()),
        multiple: 1
      },
      defaultSortOrder: "ascend",
      // Apply filter directly on this column
      onFilter: (value, record) =>
        record.name.toLowerCase().includes(value.toLowerCase()),
      // Add search functionality for this column
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Search Classroom Name"
            value={selectedKeys[0]}
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
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
          <Button onClick={() => clearFilters()} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </div>
      ),
    },
    {
      title: 'School',
      key: 'school',
      editable: true,
      width: '22.5%',
      align: 'left',
      sorter: {
        compare: (a, b) => a.school.name.toLowerCase().localeCompare(b.school.name.toLowerCase()),
        multiple: 2
      },
      render: (_, key) => (
        <span>{key.school != null ? key.school.name : <i>No school provided</i>}</span>
      ),
    },
    {
      title: 'Teachers',
      key: 'mentors',
      editable: true,
      width: '22.5%',
      align: 'left',
      render: (_, key) => (
        <span>
          {key.mentors != null && key.mentors.length != 0 ?
            key.mentors.map(mentor => {
              return <li>{mentor.first_name} {mentor.last_name}<br /></li>
            })
            : <i>No teachers assigned</i>}
        </span>
      ),
    },
    {
          title: 'Edit Classroom Details',
          dataIndex: 'view',
          key: 'view',
          width: '22.5%',
          align: 'left',
          render: (_, key) => (
              <ClassroomEditor
                  id={key.id}
                  schoolList={schoolList}
                  mentorList={mentorList}
                  gradeList={gradeList}
                  handleEditClassroom={handleEditClassroom}
              />
          )
      },
    {
      title: 'Edit Students',
      dataIndex: 'view',
      key: 'view',
      width: '22.5%',
      align: 'left',
      render: (_, classroom) => (
        <Button type="link" onClick={() => handleViewDetails(classroom.id)}>
          Edit Students
        </Button>
      ),
    },
  ];

  const navigate = useNavigate();

  function handleViewDetails(classroomID){
    navigate(`/ClassroomAdmin/${classroomID}`, { state: { value: 1 } });
  }
    return (
        <div>
            <div id='page-header'>
            <h1>
              Your Classrooms
            </h1>
          </div>
          <div id='content-creator-table-container'>
            <div id='content-creator-btn-container'>
            <ClassroomCreator
            classroomList={classroomList}
            gradeList={gradeList}
            schoolList={schoolList}
            handleAddClassroom={handleAddClassroom}
          ></ClassroomCreator>
            </div>
            <Table
              columns = {classroomColumns}
              dataSource = {classroomList}
              rowClassName = 'editable-row'
              rowKey = 'id'
              onChange = {(Pagination) => {
                setPage(Pagination.current);
              }}
              pagination = {{current: page ? page : 1}}
            ></Table>
          </div>
        </div>
    );
}