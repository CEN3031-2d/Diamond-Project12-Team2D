import React from "react";
import { Button, Input, Table } from "antd";
import "./OrganizationCreator/OrganizationCreator";
import { useNavigate } from 'react-router-dom';
import OrganizationCreator from "./OrganizationCreator/OrganizationCreator";
import OrganizationEditor from "./OrganizationEditor";

export default function OrganizationTab({
  organizationList,
  classroomList,
  mentorList,
  page,
  setPage,
  handleAddOrganization,
  handleEditOrganization
}) {

  const organizationColumns = [
    {
      title: "Organization Name",
      dataIndex: "name",
      key: "name",
      editable: true,
      width: "22.5%",
      align: "left",
      sorter: (a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()),
      defaultSortOrder: "ascend",
      // Apply filter directly on this column
      onFilter: (value, record) =>
        record.name.toLowerCase().includes(value.toLowerCase()),
      // Add search functionality for this column
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Search Organization Name"
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
      title: "Number of Classrooms",
      key: "num_classrooms",
      editable: true,
      width: "22.5%",
      align: "left",
      render: (_, key) => <p>{key.classrooms.length}</p>,
    },
    {
      title: "Number of Teachers",
      key: "num_mentors",
      editable: true,
      width: "22.5%",
      align: "left",
      render: (_, key) => <p>{key.mentors.length}</p>,
    },
    {
        title: "Edit School Details",
        dataIndex: "view",
        key: "view",
        width: "22.5%",
        align: "left",
        render: (_, key) => <OrganizationEditor 
            id={key.id} 
            schoolName={key.name} 
            classroomList={classroomList} 
            mentorList={mentorList}
            handleEditOrganization={handleEditOrganization}
          />
      },
    {
      title: "Edit Students",
      dataIndex: "view",
      key: "view",
      width: "22.5%",
      align: "left",
      render: (_, organization) => (
        <Button type="link" onClick={() => handleViewDetails(organization.id)}>
          Edit Students
        </Button>
      ),
    },
  ];

  const navigate = useNavigate();
  
  function handleViewDetails(organizationID){
    navigate(`/OrganizationDashboard/${organizationID}`);
  }
  return (
    <div>
      <div id="page-header">
        <h1>Your Organizations</h1>
      </div>
      <div id="content-creator-table-container">
        <div id="content-creator-btn-container">
          <OrganizationCreator
            OrganizationList={organizationList}
            handleAddOrganization={handleAddOrganization}
          ></OrganizationCreator>
        </div>
        <Table
          columns={organizationColumns}
          dataSource={organizationList}
          rowClassName="editable-row"
          rowKey="id"
          onChange={(Pagination) => {
            setPage(Pagination.current);
            setSearchParams({ tab, page: Pagination.current });
          }}
          pagination={{ current: page ? page : 1 }}
        ></Table>
      </div>
    </div>
  );
}
