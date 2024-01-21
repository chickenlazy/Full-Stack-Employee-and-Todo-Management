package net.javaguides.ems.mapper;

import net.javaguides.ems.dto.DepartmentDto;
import net.javaguides.ems.entity.Department;

public class DepartmentMapper {
    private DepartmentMapper() {
        // private constructor to prevent instantiation
    }
    // convert department jpa entity to department dto
    public static DepartmentDto mapToDepartmentDto(Department department) {
        if(department == null) {
            return null;
        }

        DepartmentDto departmentDto = new DepartmentDto();
        departmentDto.setId(department.getId());
        departmentDto.setDepartmentName(department.getDepartmentName());
        departmentDto.setDepartmentDescription(department.getDepartmentDescription());

        return departmentDto;
    }

    // convert department dto to department jpa entity
    public static Department mapToDepartment(DepartmentDto departmentDto) {
        if(departmentDto == null) {
            return null;
        }

        Department department = new Department();
        department.setId(departmentDto.getId());
        department.setDepartmentName(departmentDto.getDepartmentName());
        department.setDepartmentDescription(departmentDto.getDepartmentDescription());

        return department;
    }
}
